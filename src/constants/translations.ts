type TranslationStrings = {
  [key: string]: string;
};

type Translations = {
  en: TranslationStrings;
  ar: TranslationStrings;
};

export const translations: Translations = {
  en: {
    // General
    appName: "Taste Haven",
    menu: "Menu",
    dashboard: "Dashboard",
    ourMenu: "Our Menu",
    menuDashboard: "Menu Dashboard",
    imageNotFound: "Image not available",
    welcomeMessage: "Welcome to our restaurant menu",
    exploreMenu: "Explore our menu",
    filterByCategory: "Filter by category",
    allCategories: "All Categories",
    searchPlaceholder: "Search dishes...",
    noResults: "No dishes found",
    aboutUs: "About Us",

    // About Us page
    aboutUsTitle: "About Us",
    ourStory: "Our Story",
    ourPhilosophy: "Our Philosophy",
    ourTeam: "Our Team",
    ourCommitment: "Our Commitment",
    visitUs: "Visit us today!",
    readMore: "Read more",
    contactUs: "Contact Us Now",

    // Dashboard form
    addNewMenuItem: "Add New Menu Item",
    editMenuItem: "Edit Menu Item",
    dishName: "Dish Name",
    enterDishName: "Enter dish name",
    price: "Price",
    enterPrice: "Enter price",
    category: "Category",
    selectCategory: "Select a category",
    imageUrl: "Image URL",
    enterImageUrl: "Enter image URL",
    imageUrlHint:
      "Enter a valid image URL (e.g., https://example.com/image.jpg)",
    addMenuItem: "Add Menu Item",
    updateItem: "Update Item",
    cancel: "Cancel",

    // Categories
    appetizers: "Appetizers",
    mainDishes: "Main Dishes",
    desserts: "Desserts",
    drinks: "Drinks",
    specials: "Specials",
    sides: "Sides",
    other: "Other",

    // Dashboard management
    manageMenuItems: "Manage Menu Items",
    items: "items",
    noMenuItems: "No menu items available. Add some using the form!",
    edit: "Edit",
    delete: "Delete",

    // Messages
    dishNameRequired: "Dish name is required",
    pricePositive: "Price must be a positive number",
    categoryRequired: "Category is required",
    imageUrlRequired: "Image URL is required",
    updateSuccess: "Menu item updated successfully!",
    addSuccess: "Menu item added successfully!",
    updateFailed: "Failed to update menu item",
    addFailed: "Failed to add menu item",
    loadFailed: "Failed to load menu items",
    deleteSuccess: "Menu item deleted successfully!",
    deleteFailed: "Failed to delete menu item",

    // Confirmation
    confirmDeletion: "Confirm Deletion",
    deleteConfirmText:
      "Are you sure you want to delete this menu item? This action cannot be undone.",
    deleting: "Deleting...",

    // Auth
    login: "Login",
    username: "Username",
    password: "Password",
    enterUsername: "Enter username",
    enterPassword: "Enter password",
    invalidCredentials: "Invalid username or password",
    loginRequired: "You need to login to access the dashboard",
    loginSuccess: "Login successful!",
    logout: "Logout",
    accessDenied: "Access Denied",
    adminLogin: "Admin Login",
    demoCredentials: "Demo Credentials",
    backToMenu: "Back to Menu",
    switchToLanguage: "Switch Language",
    loggingIn: "Logging in...",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginFailed: "Login failed. Please try again.",
    pasteImageUrl: "Paste image URL here",
    redirectingToAdminLogin: "Redirecting to admin login...",
    redirectingToLogin: "Redirecting to login...",
  },
  ar: {
    // General
    appName: "المذاق الرائع",
    menu: "القائمة",
    dashboard: "لوحة التحكم",
    ourMenu: "قائمتنا",
    menuDashboard: "لوحة تحكم القائمة",
    imageNotFound: "الصورة غير متوفرة",
    welcomeMessage: "مرحباً بكم في قائمة مطعمنا",
    exploreMenu: "استكشف قائمتنا",
    filterByCategory: "تصفية حسب الفئة",
    allCategories: "جميع الفئات",
    searchPlaceholder: "ابحث عن الأطباق...",
    noResults: "لم يتم العثور على أطباق",
    aboutUs: "من نحن",

    // About Us page
    aboutUsTitle: "من نحن",
    ourStory: "قصتنا",
    ourPhilosophy: "فلسفتنا",
    ourTeam: "فريقنا",
    ourCommitment: "التزامنا",
    visitUs: "قم بزيارتنا اليوم!",
    readMore: "اقرأ المزيد",
    contactUs: "تواصل معنا الآن",

    // Dashboard form
    addNewMenuItem: "إضافة عنصر جديد للقائمة",
    editMenuItem: "تعديل عنصر القائمة",
    dishName: "اسم الطبق",
    enterDishName: "أدخل اسم الطبق",
    price: "السعر",
    enterPrice: "أدخل السعر",
    category: "الفئة",
    selectCategory: "اختر فئة",
    imageUrl: "رابط الصورة",
    enterImageUrl: "أدخل رابط الصورة",
    imageUrlHint: "أدخل رابط صورة صالح (مثال: https://example.com/image.jpg)",
    addMenuItem: "إضافة عنصر للقائمة",
    updateItem: "تحديث العنصر",
    cancel: "إلغاء",

    // Categories
    appetizers: "المقبلات",
    mainDishes: "الأطباق الرئيسية",
    desserts: "الحلويات",
    drinks: "المشروبات",
    specials: "الأطباق الخاصة",
    sides: "الأطباق الجانبية",
    other: "أخرى",

    // Dashboard management
    manageMenuItems: "إدارة عناصر القائمة",
    items: "عناصر",
    noMenuItems:
      "لا توجد عناصر متاحة في القائمة. أضف بعض العناصر باستخدام النموذج!",
    edit: "تعديل",
    delete: "حذف",

    // Messages
    dishNameRequired: "اسم الطبق مطلوب",
    pricePositive: "يجب أن يكون السعر رقمًا موجبًا",
    categoryRequired: "الفئة مطلوبة",
    imageUrlRequired: "رابط الصورة مطلوب",
    updateSuccess: "تم تحديث عنصر القائمة بنجاح!",
    addSuccess: "تمت إضافة عنصر القائمة بنجاح!",
    updateFailed: "فشل تحديث عنصر القائمة",
    addFailed: "فشل إضافة عنصر القائمة",
    loadFailed: "فشل تحميل عناصر القائمة",
    deleteSuccess: "تم حذف عنصر القائمة بنجاح!",
    deleteFailed: "فشل حذف عنصر القائمة",

    // Confirmation
    confirmDeletion: "تأكيد الحذف",
    deleteConfirmText:
      "هل أنت متأكد من رغبتك في حذف عنصر القائمة هذا؟ لا يمكن التراجع عن هذا الإجراء.",
    deleting: "جاري الحذف...",

    // Auth
    login: "تسجيل الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    enterUsername: "أدخل اسم المستخدم",
    enterPassword: "أدخل كلمة المرور",
    invalidCredentials: "اسم المستخدم أو كلمة المرور غير صحيحة",
    loginRequired: "يجب تسجيل الدخول للوصول إلى لوحة التحكم",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    logout: "تسجيل الخروج",
    accessDenied: "الوصول مرفوض",
    adminLogin: "تسجيل دخول المدير",
    demoCredentials: "بيانات الاعتماد التجريبية",
    backToMenu: "العودة إلى القائمة",
    switchToLanguage: "تغيير اللغة",
    loggingIn: "جاري تسجيل الدخول...",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    loginFailed: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
    pasteImageUrl: "الصق رابط الصورة هنا",
    redirectingToAdminLogin: "جاري التوجيه إلى صفحة تسجيل دخول المدير...",
  },
};

export type LanguageCode = "en" | "ar";
