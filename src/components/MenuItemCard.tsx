"use client";

import { MenuItem } from "@/types/MenuItem";
import MenuImage from "./MenuImage";
import { useLanguage } from "@/context/LanguageContext";
import { formatEGP } from "@/utils/currency";
import { motion } from "framer-motion";

interface MenuItemCardProps {
  item: MenuItem;
  priority?: boolean;
}

export default function MenuItemCard({
  item,
  priority = false,
}: MenuItemCardProps) {
  const { t, isRTL } = useLanguage();

  // Get translated category name
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100 h-full flex flex-col"
    >
      <div className="relative h-56 w-full overflow-hidden group">
        <MenuImage
          src={item.image_url}
          alt={item.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full bg-amber-500/90 text-white backdrop-blur-sm">
            {getCategoryName(item.category)}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow" dir={isRTL ? "rtl" : "ltr"}>
        <h3 className="text-xl font-serif font-semibold mb-2 text-amber-900">
          {item.name}
        </h3>

        <p className="text-amber-700 text-sm line-clamp-2 mb-3 flex-grow">
          {item.description || t("noDescription")}
        </p>

        <div className="mt-auto">
          <p className="text-amber-600 font-bold text-xl">
            {formatEGP(item.price)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
