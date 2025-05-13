"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BasicButton from "@/components/BasicButton";

export default function Home() {
  const { menuItemsByCategory, isLoading, error } = useMenu();
  const { t, isRTL } = useLanguage();
  const categories = Object.keys(menuItemsByCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Initialize expanded categories state
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Update expanded categories whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      const newExpandedState = { ...expandedCategories };
      let hasChanges = false;

      categories.forEach((category) => {
        // Only add categories that don't already exist in state
        if (newExpandedState[category] === undefined) {
          newExpandedState[category] = true;
          hasChanges = true;
        }
      });

      // Only update state if there are actual changes
      if (hasChanges) {
        setExpandedCategories(newExpandedState);
      }
    }
  }, [categories]);

  // Initialize expanded categories based on URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        setExpandedCategories((prev) => ({
          ...prev,
          [categoryParam]: true,
        }));
      }
    }
  }, [expandedCategories]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Get category name with translation
  const getCategoryName = (category: string) => {
    // Convert the category to a key for translation
    const key = category.toLowerCase().replace(/\s+/g, "");

    // Check if there's a direct translation
    if (t(key) !== key) return t(key);

    // Check for specific categories we know about
    switch (category) {
      case "Appetizers":
        return t("appetizers");
      case "Main Dishes":
        return t("mainDishes");
      case "Desserts":
        return t("desserts");
      case "Drinks":
        return t("drinks");
      case "Specials":
        return t("specials");
      case "Sides":
        return t("sides");
      default:
        return category;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  // Check if we have any items matching the search term
  const hasSearchResults = categories.some((category) =>
    menuItemsByCategory[category]?.some((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Styles
  const styles = {
    searchInput: {
      width: "100%",
      padding: "12px 40px 12px 40px",
      border: "2px solid #d97706",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#713f12",
      outline: "none",
    },
    searchIcon: {
      position: "absolute" as const,
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "18px",
      color: "#d97706",
    },
    clearButton: {
      position: "absolute" as const,
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "transparent",
      border: "none",
      color: "#d97706",
      fontSize: "18px",
      cursor: "pointer",
    },
    searchContainer: {
      marginBottom: "24px",
      position: "relative" as const,
      maxWidth: "480px",
      margin: "0 auto 24px auto",
    },
    categoryButton: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#d97706",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      flexDirection: isRTL ? ("row-reverse" as const) : ("row" as const),
    },
    chevronIcon: {
      fontSize: "24px",
      color: "#fef3c7",
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar />

      <main className="max-w-6xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-serif font-bold text-amber-900 mb-2"
          >
            {t("ourMenu")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-amber-700 max-w-lg mx-auto"
          >
            {t("welcomeMessage")}
          </motion.p>
        </div>

        {/* Search section */}
        <div style={styles.searchContainer}>
          <div
            style={{
              display: showSearch ? "block" : "none",
              marginBottom: "16px",
            }}
          >
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <div style={styles.searchIcon}>🔍</div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={styles.clearButton}
                >
                  ✖
                </button>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <BasicButton
              onClick={() => setShowSearch(!showSearch)}
              text={showSearch ? t("hideSearch") : t("showSearch")}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-amber-200 opacity-25"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-amber-600 animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg relative mx-auto max-w-md"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </motion.div>
        ) : categories.length === 0 ? (
          <p className="text-center text-amber-700 font-serif text-lg">
            {t("noMenuItems")}
          </p>
        ) : !hasSearchResults && searchTerm ? (
          <div className="text-center py-10">
            <p className="text-amber-700 font-serif text-lg">
              {t("noResults")}
            </p>
          </div>
        ) : (
          <motion.div
            className="space-y-6 md:space-y-8"
            initial="hidden"
            animate="show"
            variants={containerVariants}
          >
            {categories.map((category) => {
              // Filter items in this category that match the search term
              const filteredItems = searchTerm
                ? menuItemsByCategory[category]?.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                : menuItemsByCategory[category];

              // Skip rendering categories with no matching items
              if (!filteredItems || filteredItems.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  className="rounded-xl overflow-hidden shadow-md bg-white"
                  variants={itemVariants}
                >
                  <button
                    onClick={() => toggleCategory(category)}
                    style={styles.categoryButton}
                  >
                    <h2 className="text-xl md:text-2xl font-serif font-semibold">
                      {getCategoryName(category)}
                    </h2>
                    <div style={styles.chevronIcon}>
                      {expandedCategories[category] ? "▲" : "▼"}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCategories[category] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                          {filteredItems.map((item, itemIndex) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <MenuItemCard
                                item={item}
                                priority={
                                  // Only set priority for the first few items that are likely to be above the fold
                                  expandedCategories[category] &&
                                  categories.indexOf(category) === 0 &&
                                  itemIndex < 3
                                }
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
