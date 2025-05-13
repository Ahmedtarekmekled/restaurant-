// Script to seed the database with sample food items
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Initialize environment variables
config({ path: ".env.local" });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface FoodItem {
  name: string;
  price: number;
  category: string;
  image_url: string;
  description?: string;
}

const foodItems: FoodItem[] = [
  // Appetizers
  {
    name: "Hummus with Pita",
    price: 45.0,
    category: "Appetizers",
    image_url:
      "https://images.unsplash.com/photo-1634487359989-3e90c9432133?q=80&w=764&auto=format&fit=crop",
  },
  {
    name: "Stuffed Vine Leaves",
    price: 55.0,
    category: "Appetizers",
    image_url:
      "https://images.unsplash.com/photo-1632843149101-71f575523b70?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Baba Ganoush",
    price: 50.0,
    category: "Appetizers",
    image_url:
      "https://images.unsplash.com/photo-1505253468034-514d2507d914?q=80&w=880&auto=format&fit=crop",
  },
  {
    name: "Falafel Plate",
    price: 60.0,
    category: "Appetizers",
    image_url:
      "https://images.unsplash.com/photo-1642694358592-e4c8ddd60c6f?q=80&w=1374&auto=format&fit=crop",
  },

  // Main Dishes
  {
    name: "Lamb Kofta",
    price: 120.0,
    category: "Main Dishes",
    image_url:
      "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Chicken Shawarma",
    price: 95.0,
    category: "Main Dishes",
    image_url:
      "https://images.unsplash.com/photo-1664482494979-04fd4d22ec9a?q=80&w=1479&auto=format&fit=crop",
  },
  {
    name: "Koshari",
    price: 70.0,
    category: "Main Dishes",
    image_url:
      "https://plus.unsplash.com/premium_photo-1676445217384-de2307fa4a3e?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Molokhia with Chicken",
    price: 110.0,
    category: "Main Dishes",
    image_url:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Grilled Sea Bass",
    price: 160.0,
    category: "Main Dishes",
    image_url:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1470&auto=format&fit=crop",
  },

  // Desserts
  {
    name: "Kunafa",
    price: 65.0,
    category: "Desserts",
    image_url:
      "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Baklava",
    price: 55.0,
    category: "Desserts",
    image_url:
      "https://images.unsplash.com/photo-1566043688454-5436d5f0a367?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Basbousa",
    price: 45.0,
    category: "Desserts",
    image_url:
      "https://images.unsplash.com/photo-1624113122662-78cc4c8203a0?q=80&w=1470&auto=format&fit=crop",
  },

  // Drinks
  {
    name: "Mint Tea",
    price: 25.0,
    category: "Drinks",
    image_url:
      "https://images.unsplash.com/photo-1582735459971-e3f218880bff?q=80&w=1373&auto=format&fit=crop",
  },
  {
    name: "Turkish Coffee",
    price: 30.0,
    category: "Drinks",
    image_url:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aedda?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Mango Juice",
    price: 35.0,
    category: "Drinks",
    image_url:
      "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1374&auto=format&fit=crop",
  },
  {
    name: "Karkadeh",
    price: 30.0,
    category: "Drinks",
    image_url:
      "https://plus.unsplash.com/premium_photo-1674486188524-68cfcba0a9c2?q=80&w=1470&auto=format&fit=crop",
  },

  // Specials
  {
    name: "Mixed Grill Platter",
    price: 220.0,
    category: "Specials",
    image_url:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1469&auto=format&fit=crop",
  },
  {
    name: "Seafood Tagine",
    price: 180.0,
    category: "Specials",
    image_url:
      "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=1470&auto=format&fit=crop",
  },

  // Sides
  {
    name: "Tahini Salad",
    price: 40.0,
    category: "Sides",
    image_url:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop",
  },
  {
    name: "Egyptian Rice",
    price: 35.0,
    category: "Sides",
    image_url:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=1470&auto=format&fit=crop",
  },
];

async function seedDatabase() {
  console.log("Starting database seeding...");

  try {
    // Clear existing items (optional)
    // const { error: deleteError } = await supabase.from('menu_items').delete().neq('id', '0');
    // if (deleteError) throw deleteError;
    // console.log('Cleared existing menu items');

    // Insert new items
    for (const item of foodItems) {
      const { error } = await supabase.from("menu_items").insert([item]);

      if (error) {
        console.error(`Error adding item "${item.name}":`, error);
      } else {
        console.log(`Added: ${item.name}`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding process:", error);
  }
}

seedDatabase();
