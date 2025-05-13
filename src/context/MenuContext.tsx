"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { MenuItem } from "@/types/MenuItem";
import {
  getMenuItemsByCategory,
  addMenuItem as addMenuItemToSupabase,
} from "@/lib/supabase";

interface MenuContextType {
  menuItemsByCategory: Record<string, MenuItem[]>;
  isLoading: boolean;
  error: string | null;
  addMenuItem: (item: {
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
  }) => Promise<MenuItem | null>;
  refreshMenuItems: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuItemsByCategory, setMenuItemsByCategory] = useState<
    Record<string, MenuItem[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const groupedItems = await getMenuItemsByCategory();
      setMenuItemsByCategory(groupedItems);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      setError("Failed to fetch menu items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch menu items on load
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const addMenuItem = async (item: {
    name: string;
    price: number;
    category: string;
    image_url: string;
    description: string;
  }) => {
    try {
      // Ensure the image URL starts with http or https
      let imageUrl = item.image_url;
      if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
        imageUrl = `https://${imageUrl}`;
      }

      const newItem = await addMenuItemToSupabase({
        ...item,
        image_url: imageUrl,
      });

      if (newItem) {
        // Refresh the menu items to reflect the new item
        await fetchMenuItems();
        return newItem;
      }
      return null;
    } catch (err) {
      console.error("Failed to add menu item:", err);
      setError("Failed to add menu item. Please try again.");
      throw err; // Re-throw to handle in the component
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItemsByCategory,
        isLoading,
        error,
        addMenuItem,
        refreshMenuItems: fetchMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
