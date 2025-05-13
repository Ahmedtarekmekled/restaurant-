import type { Metadata } from "next";
import { Inter, Lora, Amiri } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Amiri font for Arabic text
const amiri = Amiri({
  variable: "--font-arabic",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taste Haven Menu",
  description: "Exquisite dining experience with our curated menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${amiri.variable} antialiased`}
      >
        <LanguageProvider>
          <AuthProvider>
            <MenuProvider>{children}</MenuProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
