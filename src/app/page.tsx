"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BasicButton from "@/components/BasicButton";
import { ArrowUp } from "lucide-react";

export default function Home() {
  const { menuItemsByCategory, isLoading, error } = useMenu();
  const { t, isRTL } = useLanguage();
  const categories = Object.keys(menuItemsByCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 300); // Show button after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  // Check if we have any items matching the category
  const hasSearchResults = categories.some((category) => {
    if (selectedCategory && category !== selectedCategory) return false;
    return menuItemsByCategory[category]?.length > 0;
  });

  // Styles
  const styles = {
    categoryFilter: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "8px",
      marginTop: "12px",
      marginBottom: "24px",
      justifyContent: "center",
    },
    categoryFilterButton: {
      padding: "6px 12px",
      backgroundColor: "#fef3c7",
      color: "#92400e",
      border: "1px solid #d97706",
      borderRadius: "16px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s",
    },
    activeCategoryButton: {
      backgroundColor: "#d97706",
      color: "white",
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

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-amber-700 hover:to-amber-800 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          outline: "none",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

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

        {/* Category filter section */}
        <div style={styles.categoryFilter}>
          <button
            onClick={() => setSelectedCategory("")}
            style={{
              ...styles.categoryFilterButton,
              ...(selectedCategory === "" ? styles.activeCategoryButton : {}),
            }}
          >
            {t("allCategories")}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryFilterButton,
                ...(selectedCategory === category
                  ? styles.activeCategoryButton
                  : {}),
              }}
            >
              {getCategoryName(category)}
            </button>
          ))}
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
        ) : !hasSearchResults && selectedCategory ? (
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
              // Filter items in this category that match the selected category
              const filteredItems = selectedCategory
                ? menuItemsByCategory[category]?.filter(
                    (item) => category === selectedCategory
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
