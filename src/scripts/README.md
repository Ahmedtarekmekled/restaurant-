# Database Seeding Script

This directory contains scripts for seeding the database with initial data.

## Seed Data Script

The `seedData.js` script populates the database with 20 sample food items across different categories:

- Appetizers
- Main Dishes
- Desserts
- Drinks
- Specials
- Sides

## Prerequisites

Before running the seed script, make sure:

1. Your Supabase project is set up
2. Your environment variables are properly configured in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Running the Script

To seed your database with sample data, run:

```bash
npm run seed
```

## Authentication

The default admin credentials for logging into the dashboard are:

- Username: admin
- Password: admin123

You can customize these credentials by setting the following environment variables:

- `NEXT_PUBLIC_ADMIN_USERNAME`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

## Sample Data

The sample data includes a variety of Middle Eastern and Mediterranean dishes with realistic prices and descriptions. Each item includes:

- Name
- Price
- Category
- Image URL (from Unsplash)
- Description

The images are hosted on Unsplash and are freely available for use.
