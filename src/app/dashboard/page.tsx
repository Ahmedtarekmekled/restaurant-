"use client";

import { useState, useEffect, Fragment, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import {
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByCategory,
} from "@/lib/supabase";
import { MenuItem } from "@/types/MenuItem";
import MenuImage from "@/components/MenuImage";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Pencil,
  Trash2,
  Tag,
  DollarSign,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
  Coffee,
  Loader2,
  Globe,
  LogOut,
  FileText,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react";
import { formatEGP } from "@/utils/currency";

// Predefined categories
const CATEGORIES = [
  "Appetizers",
  "Main Dishes",
  "Desserts",
  "Drinks",
  "Specials",
  "Sides",
];

export default function Dashboard() {
  const { addMenuItem, error: contextError } = useMenu();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { logout } = useAuth();

  // State for form handling
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    image_url: "",
    description: "",
  });
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // State for menu items management
  const [menuItemsByCategory, setMenuItemsByCategory] = useState<
    Record<string, MenuItem[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // State for editing and deleting
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editSuccess, setEditSuccess] = useState("");

  // State for accordion
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  // Fetch menu items grouped by category
  const fetchMenuItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const groupedItems = await getMenuItemsByCategory();
      setMenuItemsByCategory(groupedItems);

      // Initialize expanded state for new categories
      const updatedExpandedState = { ...expandedCategories };
      let hasChanges = false;

      Object.keys(groupedItems).forEach((category) => {
        if (updatedExpandedState[category] === undefined) {
          updatedExpandedState[category] = true; // Default to expanded
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setExpandedCategories(updatedExpandedState);
      }
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setLoadError(t("loadFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [expandedCategories, t]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      category: "",
      image_url: "",
      description: "",
    });
    setIsEditing(false);
    setFormSuccess("");
    setFormError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError(t("dishNameRequired"));
      return false;
    }

    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      setFormError(t("pricePositive"));
      return false;
    }

    if (!formData.category) {
      setFormError(t("categoryRequired"));
      return false;
    }

    if (!formData.image_url.trim()) {
      setFormError(t("imageUrlRequired"));
      return false;
    }

    // Validate image URL format
    let imageUrl = formData.image_url.trim();
    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      // Add https if missing
      imageUrl = `https://${imageUrl}`;
      setFormData((prev) => ({ ...prev, image_url: imageUrl }));
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setEditSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsFormSubmitting(true);

    try {
      if (isEditing) {
        // Update existing item
        await updateMenuItem(formData.id, {
          name: formData.name.trim(),
          price: Number(formData.price),
          category: formData.category,
          image_url: formData.image_url.trim(),
          description: formData.description.trim(),
        });
        setFormSuccess(t("updateSuccess"));
      } else {
        // Add new item
        await addMenuItem({
          name: formData.name.trim(),
          price: Number(formData.price),
          category: formData.category,
          image_url: formData.image_url.trim(),
          description: formData.description.trim(),
        });
        setFormSuccess(t("addSuccess"));
      }

      // Reset form and refresh menu items
      resetForm();
      await fetchMenuItems();
    } catch (err) {
      setFormError(isEditing ? t("updateFailed") : t("addFailed"));
      console.error(err);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      id: item.id,
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url,
      description: item.description,
    });
    setIsEditing(true);
    setEditSuccess("");
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await deleteMenuItem(itemToDelete);
      setEditSuccess(t("deleteSuccess"));
      await fetchMenuItems();
    } catch (err) {
      setLoadError(t("deleteFailed"));
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryName = (category: string) => {
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
      case "Other":
        return t("other");
      default:
        return category;
    }
  };

  const totalItemCount = Object.values(menuItemsByCategory).reduce(
    (total, items) => total + items.length,
    0
  );

  const handleImageAttach = () => {
    // Implementation of handleImageAttach function
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items based on search query
  const filteredMenuItemsByCategory = Object.keys(menuItemsByCategory).reduce(
    (acc, category) => {
      if (searchQuery.trim() === "") {
        acc[category] = menuItemsByCategory[category];
      } else {
        const filteredItems = menuItemsByCategory[category].filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredItems.length > 0) {
          acc[category] = filteredItems;
        }
      }
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-center text-amber-900">
            {t("menuDashboard")}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={toggleLanguage}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#d97706",
                color: "white",
                padding: "0.5rem",
                borderRadius: "9999px",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#b45309")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#d97706")
              }
              aria-label={
                language === "en" ? "Switch to Arabic" : "Switch to English"
              }
            >
              <Globe size={18} />
            </button>
            <button
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#d97706",
                color: "white",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                border: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#b45309")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#d97706")
              }
            >
              <LogOut size={16} style={{ marginRight: "0.5rem" }} />{" "}
              {t("logout")}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8" dir={isRTL ? "rtl" : "ltr"}>
          {/* Section 1: Add New Menu Item */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-4 px-6">
                <h2 className="text-xl font-serif font-semibold text-white flex items-center">
                  {isEditing ? (
                    <>
                      <Pencil size={18} className="mr-2" /> {t("editMenuItem")}
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} className="mr-2" />{" "}
                      {t("addNewMenuItem")}
                    </>
                  )}
                </h2>
              </div>

              <div className="p-6">
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {contextError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    <span>{contextError}</span>
                  </div>
                )}

                {formSuccess && (
                  <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-md text-sm flex items-center">
                    <CheckCircle2 size={16} className="mr-2 flex-shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block mb-1 font-medium text-sm text-gray-700 flex items-center"
                    >
                      <Tag
                        size={16}
                        style={{ marginRight: "0.5rem", color: "#d97706" }}
                      />
                      {t("dishName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.625rem",
                        backgroundColor: "white",
                        color: "#334155",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        direction: isRTL ? "rtl" : "ltr",
                      }}
                      placeholder={t("enterDishName")}
                      disabled={isFormSubmitting}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block mb-1 font-medium text-sm text-gray-700 flex items-center"
                    >
                      <DollarSign
                        size={16}
                        style={{ marginRight: "0.5rem", color: "#d97706" }}
                      />
                      {t("price")} (ج.م)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.625rem",
                        backgroundColor: "white",
                        color: "#334155",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        direction: "ltr",
                      }}
                      placeholder={t("enterPrice")}
                      min="0"
                      step="0.01"
                      disabled={isFormSubmitting}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block mb-1 font-medium text-sm text-gray-700 flex items-center"
                    >
                      <FileText
                        size={16}
                        style={{ marginRight: "0.5rem", color: "#d97706" }}
                      />
                      {t("description")}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.625rem",
                        backgroundColor: "white",
                        color: "#334155",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        minHeight: "6rem",
                        direction: isRTL ? "rtl" : "ltr",
                      }}
                      placeholder={t("enterDescription")}
                      disabled={isFormSubmitting}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block text-amber-800 text-sm font-medium mb-2 flex items-center"
                    >
                      <Tag size={16} className="mr-2 text-amber-600" />{" "}
                      {t("category")}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "0.625rem",
                        backgroundColor: "white",
                        color: "#334155",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        appearance: "none",
                        backgroundImage:
                          'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.5rem center",
                        backgroundSize: "1.5em 1.5em",
                      }}
                      required
                    >
                      <option value="">{t("selectCategory")}</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {getCategoryName(cat)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="image_url"
                      className="block mb-1 font-medium text-sm text-gray-700 flex items-center"
                    >
                      <ImageIcon
                        size={16}
                        style={{ marginRight: "0.5rem", color: "#d97706" }}
                      />
                      {t("imageUrl")}
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        style={{
                          flex: "1",
                          padding: "0.625rem",
                          backgroundColor: "white",
                          color: "#334155",
                          borderRadius: "0.375rem 0 0 0.375rem",
                          fontSize: "0.875rem",
                          border: "1px solid #e2e8f0",
                          borderRight: "none",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          direction: "ltr",
                        }}
                        placeholder={t("pasteImageUrl")}
                        disabled={isFormSubmitting}
                      />
                      <button
                        type="button"
                        onClick={handleImageAttach}
                        disabled={isFormSubmitting}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.625rem",
                          backgroundColor: "#d97706",
                          color: "white",
                          borderRadius: "0 0.375rem 0.375rem 0",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          border: "none",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          cursor: isFormSubmitting ? "not-allowed" : "pointer",
                          opacity: isFormSubmitting ? 0.7 : 1,
                        }}
                        onMouseOver={(e) =>
                          !isFormSubmitting &&
                          (e.currentTarget.style.backgroundColor = "#b45309")
                        }
                        onMouseOut={(e) =>
                          !isFormSubmitting &&
                          (e.currentTarget.style.backgroundColor = "#d97706")
                        }
                      >
                        <Paperclip size={16} />
                      </button>
                    </div>
                    {formData.image_url ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "160px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "0.375rem",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={formData.image_url}
                          alt={t("itemPreview")}
                          width={300}
                          height={160}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            // Handle image error by setting a placeholder
                            e.currentTarget.src =
                              "https://placehold.co/600x400?text=Image+Error";
                          }}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isFormSubmitting}
                      style={{
                        flex: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0.625rem 1rem",
                        backgroundColor: isFormSubmitting
                          ? "#fbbf24"
                          : "#d97706",
                        color: "white",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        border: "none",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        cursor: isFormSubmitting ? "not-allowed" : "pointer",
                        opacity: isFormSubmitting ? 0.7 : 1,
                      }}
                    >
                      {isFormSubmitting ? (
                        <>
                          <Loader2
                            size={16}
                            style={{
                              marginRight: "0.5rem",
                              animation: "spin 1s linear infinite",
                            }}
                          />
                          <style jsx>{`
                            @keyframes spin {
                              to {
                                transform: rotate(360deg);
                              }
                            }
                          `}</style>
                          {isEditing
                            ? t("updateItem") + "..."
                            : t("addMenuItem") + "..."}
                        </>
                      ) : (
                        <>
                          <Save size={16} style={{ marginRight: "0.5rem" }} />
                          {isEditing ? t("updateItem") : t("addMenuItem")}
                        </>
                      )}
                    </button>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isFormSubmitting}
                        style={{
                          flex: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.625rem 1rem",
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          border: "none",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          cursor: isFormSubmitting ? "not-allowed" : "pointer",
                          opacity: isFormSubmitting ? 0.7 : 1,
                        }}
                        onMouseOver={(e) =>
                          !isFormSubmitting &&
                          (e.currentTarget.style.backgroundColor = "#fde68a")
                        }
                        onMouseOut={(e) =>
                          !isFormSubmitting &&
                          (e.currentTarget.style.backgroundColor = "#fef3c7")
                        }
                      >
                        <X size={16} style={{ marginRight: "0.5rem" }} />
                        {t("cancel")}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section 2: Manage Menu Items */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-4 px-6 flex justify-between items-center">
                <h2 className="text-xl font-serif font-semibold text-white flex items-center">
                  <Coffee size={18} className="mr-2" />
                  {t("manageMenuItems")}
                </h2>
                <span className="bg-white text-amber-600 text-xs font-bold px-2.5 py-1.5 rounded-full">
                  {totalItemCount} {t("items")}
                </span>
              </div>

              <div className="p-6">
                {loadError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                    <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                    <span>{loadError}</span>
                  </div>
                )}

                {editSuccess && (
                  <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-md text-sm flex items-center">
                    <CheckCircle2 size={16} className="mr-2 flex-shrink-0" />
                    <span>{editSuccess}</span>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2
                      size={36}
                      className="animate-spin text-amber-500"
                    />
                  </div>
                ) : Object.keys(filteredMenuItemsByCategory).length === 0 &&
                  searchQuery.trim() !== "" ? (
                  <div className="text-center py-10">
                    <p className="text-amber-700 font-serif text-lg">
                      {t("noResults")}
                    </p>
                  </div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                  >
                    {/* Search box */}
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={t("searchItems")}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full p-2 pl-8 border border-amber-200 rounded-md"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {Object.keys(filteredMenuItemsByCategory).map(
                      (category) => (
                        <motion.div
                          key={category}
                          className="border border-amber-100 rounded-lg overflow-hidden shadow-md"
                          variants={itemVariants}
                        >
                          <button
                            onClick={() => toggleCategory(category)}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "1rem",
                              backgroundColor: "#f8fafc",
                              color: "#334155",
                              textAlign: "left",
                              borderRadius: "0.5rem 0.5rem 0 0",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f1f5f9")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f8fafc")
                            }
                          >
                            <div className="flex items-center">
                              <Tag
                                size={16}
                                style={{
                                  marginRight: "0.5rem",
                                  color: "#d97706",
                                }}
                              />
                              <h3 className="text-lg font-serif font-medium text-amber-800">
                                {getCategoryName(category)}
                              </h3>
                              <span
                                style={{
                                  marginLeft: "0.5rem",
                                  backgroundColor: "#fef3c7",
                                  color: "#92400e",
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
                                  padding: "0.125rem 0.625rem",
                                  borderRadius: "9999px",
                                }}
                              >
                                {filteredMenuItemsByCategory[category].length}
                              </span>
                            </div>
                            <div style={{ color: "#d97706" }}>
                              {expandedCategories[category] ? (
                                <ChevronUp
                                  size={20}
                                  style={{
                                    transform: isRTL
                                      ? "rotate(180deg)"
                                      : "none",
                                  }}
                                />
                              ) : (
                                <ChevronDown
                                  size={20}
                                  style={{
                                    transform: isRTL
                                      ? "rotate(180deg)"
                                      : "none",
                                  }}
                                />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedCategories[category] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                              >
                                <div className="divide-y divide-amber-100">
                                  {filteredMenuItemsByCategory[category].map(
                                    (item) => (
                                      <motion.div
                                        key={item.id}
                                        className="p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:bg-amber-50 transition-colors"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <div className="w-24 h-24 relative rounded-md overflow-hidden flex-shrink-0 border border-amber-100">
                                          <MenuImage
                                            src={
                                              item.image_url ||
                                              "/images/placeholder-food.jpg"
                                            }
                                            alt={
                                              item.name || t("menuItemImage")
                                            }
                                            fill
                                            sizes="96px"
                                          />
                                        </div>

                                        <div className="flex-1 min-w-0 text-center sm:text-left">
                                          <h4 className="text-base font-medium text-amber-900 truncate">
                                            {item.name}
                                          </h4>
                                          <p className="text-sm text-amber-600 font-bold mt-1">
                                            {formatEGP(item.price)}
                                          </p>
                                          <p className="text-xs text-amber-500 mt-1">
                                            {getCategoryName(category)}
                                          </p>
                                        </div>

                                        <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                                          <button
                                            onClick={() => handleEdit(item)}
                                            style={{
                                              display: "inline-flex",
                                              alignItems: "center",
                                              padding: "0.375rem 0.75rem",
                                              backgroundColor: "#f59e0b",
                                              color: "white",
                                              borderRadius: "0.375rem",
                                              fontSize: "0.75rem",
                                              fontWeight: "500",
                                              border: "none",
                                              boxShadow:
                                                "0 1px 2px rgba(0, 0, 0, 0.05)",
                                              cursor: "pointer",
                                            }}
                                            onMouseOver={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "#d97706")
                                            }
                                            onMouseOut={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "#f59e0b")
                                            }
                                          >
                                            <Pencil
                                              size={14}
                                              style={{
                                                marginRight: "0.375rem",
                                              }}
                                            />
                                            {t("edit")}
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteClick(item.id)
                                            }
                                            style={{
                                              display: "inline-flex",
                                              alignItems: "center",
                                              padding: "0.375rem 0.75rem",
                                              backgroundColor: "#f43f5e",
                                              color: "white",
                                              borderRadius: "0.375rem",
                                              fontSize: "0.75rem",
                                              fontWeight: "500",
                                              border: "none",
                                              boxShadow:
                                                "0 1px 2px rgba(0, 0, 0, 0.05)",
                                              cursor: "pointer",
                                            }}
                                            onMouseOver={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "#e11d48")
                                            }
                                            onMouseOut={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "#f43f5e")
                                            }
                                          >
                                            <Trash2
                                              size={14}
                                              style={{
                                                marginRight: "0.375rem",
                                              }}
                                            />
                                            {t("delete")}
                                          </button>
                                        </div>
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-amber-900 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <h3 className="text-lg font-serif font-semibold mb-2 text-amber-900">
              {t("confirmDeletion")}
            </h3>
            <p className="mb-6 text-amber-700 text-sm">
              {t("deleteConfirmText")}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  border: "none",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  opacity: isDeleting ? 0.7 : 1,
                }}
                onMouseOver={(e) =>
                  !isDeleting &&
                  (e.currentTarget.style.backgroundColor = "#fde68a")
                }
                onMouseOut={(e) =>
                  !isDeleting &&
                  (e.currentTarget.style.backgroundColor = "#fef3c7")
                }
              >
                {t("cancel")}
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f43f5e",
                  color: "white",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  border: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  opacity: isDeleting ? 0.7 : 1,
                }}
                onMouseOver={(e) =>
                  !isDeleting &&
                  (e.currentTarget.style.backgroundColor = "#e11d48")
                }
                onMouseOut={(e) =>
                  !isDeleting &&
                  (e.currentTarget.style.backgroundColor = "#f43f5e")
                }
              >
                {isDeleting ? (
                  <>
                    <Loader2
                      size={14}
                      style={{
                        marginRight: "0.5rem",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    {t("deleting")}
                  </>
                ) : (
                  <>
                    <Trash2 size={14} style={{ marginRight: "0.5rem" }} />
                    {t("delete")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
