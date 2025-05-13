"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import footerContent from "@/content/footer.json";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";

// Define a type for the footer content
type FooterContent = {
  branding: {
    title: string;
    description: string;
  };
  quickLinks: {
    title: string;
    links: Array<{ label: string; url: string }>;
  };
  contact: {
    title: string;
    socialLinks: Array<{ platform: string; icon: string; url: string }>;
    info: Array<{ type: string; value: string; icon: string }>;
  };
  legal: {
    copyright: string;
    developer: {
      text: string;
      name: string;
      url: string;
    };
  };
};

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const [content, setContent] = useState<FooterContent | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Set content based on language
    setContent(
      footerContent[language as keyof typeof footerContent] || footerContent.en
    );
  }, [language]);

  if (!content) {
    return null; // Return nothing until content is loaded
  }

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case "facebook":
        return <Facebook size={size} />;
      case "instagram":
        return <Instagram size={size} />;
      case "whatsapp":
        return <Phone size={size} />;
      case "phone":
        return <Phone size={size} />;
      case "mail":
        return <Mail size={size} />;
      case "map-pin":
        return <MapPin size={size} />;
      default:
        return <ExternalLink size={size} />;
    }
  };

  // Parse copyright text with year
  const copyright = content.legal.copyright.replace(
    "{year}",
    currentYear.toString()
  );

  // Define chevron direction based on RTL
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <footer
      className="bg-gradient-to-r from-amber-900 to-amber-800 text-amber-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Wave divider */}
      <div className="h-8 w-full overflow-hidden">
        <svg
          className="relative"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          fill="#FEF3C7"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,74.7C672,75,768,53,864,58.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto pt-6 pb-10 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Branding Column - Takes more space */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-serif font-bold text-amber-200 mb-4">
              {content.branding.title}
            </h3>
            <p className="text-amber-300/80 text-sm max-w-md text-center md:text-left mb-6">
              {content.branding.description}
            </p>

            {/* Social Links - Now in branding column */}
            <div className="flex gap-3 mb-6">
              {content.contact.socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-700 to-amber-600 flex items-center justify-center hover:from-amber-600 hover:to-amber-500 transition-colors shadow-md"
                  aria-label={social.platform}
                >
                  {renderIcon(social.icon, 18)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium text-amber-200 mb-4">
              {content.quickLinks.title}
            </h3>
            <ul className="space-y-3 w-full">
              {content.quickLinks.links.map((link, idx) => (
                <li key={idx} className="group">
                  <Link
                    href={link.url}
                    className="text-amber-300/80 hover:text-amber-100 transition-colors flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <Chevron
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-medium text-amber-200 mb-4">
              {content.contact.title}
            </h3>

            {/* Contact info */}
            <div className="space-y-3 w-full max-w-xs">
              {content.contact.info.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 rtl:space-x-reverse text-amber-300/80 group hover:text-amber-200 transition-colors"
                >
                  <div className="text-amber-400 flex-shrink-0 mt-0.5 group-hover:text-amber-300 transition-colors">
                    {renderIcon(item.icon, 16)}
                  </div>
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>

        {/* Footer Bottom - Copyright and Attribution */}
        <div className="pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-amber-300/70 mb-4 md:mb-0">
              {copyright}
            </p>
            <div className="flex items-center">
              <p className="text-sm text-amber-300/70">
                {content.legal.developer.text}
              </p>
              <a
                href={content.legal.developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mx-2"
              >
                <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent font-semibold px-1">
                  {content.legal.developer.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
