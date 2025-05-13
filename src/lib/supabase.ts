import { createClient } from "@supabase/supabase-js";
import { MenuItem } from "@/types/MenuItem";

// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Get all menu items
export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }

  return data || [];
};

// Get menu items grouped by category
export const getMenuItemsByCategory = async () => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching menu items by category:", error);
    throw error;
  }

  // Group items by category
  const groupedItems = (data || []).reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return groupedItems;
};

// Add a new menu item
export const addMenuItem = async (item: {
  name: string;
  price: number;
  category: string;
  image_url: string;
  description: string;
}) => {
  // Validate and normalize the image URL
  let imageUrl = item.image_url;
  if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
    imageUrl = `https://${imageUrl}`;
  }

  const { data, error } = await supabase
    .from("menu_items")
    .insert([
      {
        ...item,
        image_url: imageUrl,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }

  return data?.[0];
};

// Update an existing menu item
export const updateMenuItem = async (
  id: string,
  updates: {
    name?: string;
    price?: number;
    category?: string;
    image_url?: string;
    description?: string;
  }
) => {
  // Validate and normalize the image URL if it's being updated
  if (updates.image_url) {
    let imageUrl = updates.image_url;
    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      imageUrl = `https://${imageUrl}`;
      updates.image_url = imageUrl;
    }
  }

  const { data, error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }

  return data?.[0];
};

// Delete a menu item
export const deleteMenuItem = async (id: string) => {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);

  if (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }

  return true;
};
