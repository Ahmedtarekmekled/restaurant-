# 🍽️ Taste Haven | Restaurant Menu Application

A modern, multilingual restaurant menu web application built with Next.js, Tailwind CSS, and Supabase. Easily manage and display your restaurant's menu with beautiful UI, multilingual support, and a protected admin dashboard.

![Taste Haven Menu Demo](https://via.placeholder.com/800x400?text=Taste+Haven+Menu+Demo)

## ✨ Features

- **Interactive Menu Display**: Food items organized by collapsible categories
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Multilingual Support**: Complete Arabic language support with RTL design
- **Admin Dashboard**: Password-protected area to manage menu items and categories
- **Egyptian Currency**: Prices displayed in Egyptian pounds (ج.م)
- **Image Management**: Upload and manage food images via Supabase Storage
- **Modern UI**: Elegant animations, transitions, and interactive elements
- **Dark/Light Theme**: Toggle between visual modes for better user experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React 18
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Image Storage**: Supabase Storage
- **Authentication**: Environment-based auth for admin access
- **State Management**: React Context API
- **Icons**: Lucide Icons

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14.0 or higher)
- npm or yarn
- Git
- A Supabase account (free tier works perfectly)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/taste-haven-menu.git
cd taste-haven-menu
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory with:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Optional: Site Configuration
NEXT_PUBLIC_SITE_NAME="Taste Haven Restaurant"
```

### 4. Configure Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Set up the menu items table:

```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Create a storage bucket for food images:

   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `menu-images`
   - Set the privacy to public (or configure appropriate RLS policies)

4. Set up Row Level Security (RLS):
   - Enable RLS on your tables
   - Create policies that allow public reads but restrict writes to authenticated users

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🖥️ Admin Dashboard

The admin dashboard is protected with environment-based authentication:

- Access the dashboard at `/admin`
- Log in using the credentials set in your `.env.local` file
- Manage menu items, categories, and upload images

![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard)

## 📱 Menu Display

The menu is organized by categories that can be expanded/collapsed:

- Categories are collapsible for better user experience
- Items display with images, descriptions, and prices in EGP
- Mobile-optimized interface for restaurant customers

![Menu Display](https://via.placeholder.com/800x400?text=Menu+Display)

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables in the Vercel dashboard (same as in `.env.local`)
5. Deploy your application

### Deploying to Netlify

1. Push your code to a GitHub repository
2. Create a Netlify account at [netlify.com](https://netlify.com)
3. Import your GitHub repository
4. Add a `netlify.toml` file to your project:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

5. Configure environment variables in the Netlify dashboard
6. Deploy your application

## 🌎 Internationalization

The application supports multiple languages:

- English (default)
- Arabic with RTL support
- Language selection persists across sessions
- Add more languages by extending the translation files in the `content` directory

## 🙋‍♂️ Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmed Makled** - [Website](https://www.ahmedmakled.com/)

---

Made with ❤️ by [Ahmed Makled](https://www.ahmedmakled.com/)
