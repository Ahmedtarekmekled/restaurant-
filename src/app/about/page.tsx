"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone, ChevronDown, ChevronUp } from "lucide-react";
import aboutUsContent from "@/content/about-us.json";

export default function AboutPage() {
  const { isRTL } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  useEffect(() => {
    // Get the content based on the current language
    const languageKey = isRTL ? "ar" : "en";
    setContent(aboutUsContent[languageKey]);
  }, [isRTL]);

  const toggleSection = (index: number) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!content) {
    return (
      <div
        className="min-h-screen bg-amber-50 flex justify-center items-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Get the image URLs from the content
  const { images } = content;
  const sectionImages = [
    images.story,
    images.philosophy,
    images.team,
    images.commitment,
  ];

  return (
    <div className="min-h-screen bg-amber-50" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <div className="relative h-[40vh] min-h-[250px] overflow-hidden">
        <Image
          src={images.hero}
          alt={content.title}
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg"
          >
            {content.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-24 h-1 bg-amber-500 rounded-full"
          ></motion.div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Desktop view - Hidden on mobile */}
        <div className="hidden md:block">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
          >
            <div className="p-6 md:p-8">
              {content.sections.map((section: any, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`mb-12 flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  } ${
                    index !== content.sections.length - 1
                      ? "pb-12 border-b border-amber-100"
                      : ""
                  }`}
                >
                  <div className="w-full md:w-1/2 relative">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md">
                      <div className="absolute inset-0 bg-amber-600/10 z-10 rounded-lg"></div>
                      <Image
                        src={sectionImages[index]}
                        alt={section.heading}
                        fill
                        className="object-cover rounded-lg transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-4 relative inline-block">
                      {section.heading}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-200 -mb-1"></div>
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile view - Hidden on desktop */}
        <div className="md:hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-4"
          >
            {content.sections.map((section: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-4 flex justify-between items-center bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    gap: "0.5rem",
                  }}
                >
                  <h2 className="text-lg font-serif font-semibold">
                    {section.heading}
                  </h2>
                  {expandedSection === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedSection === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                  >
                    <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={sectionImages[index]}
                        alt={section.heading}
                        fill
                        className="object-cover rounded-lg"
                        sizes="100vw"
                      />
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {section.content}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact info - Visible on both */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden p-6"
        >
          <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-4 text-center">
            {content.contactInfo.title}
          </h2>

          <div className="text-center mb-6">
            <p className="text-lg font-medium text-amber-800 mb-6">
              {content.callToAction}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rtl-grid">
            <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
              <MapPin className="text-amber-600 mb-2" size={24} />
              <h3 className="font-medium text-amber-900 mb-1">
                {content.contactInfo.addressTitle}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {content.contactInfo.address}
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
              <Clock className="text-amber-600 mb-2" size={24} />
              <h3 className="font-medium text-amber-900 mb-1">
                {content.contactInfo.hoursTitle}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {content.contactInfo.hours}
              </p>
            </div>

            <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
              <Phone className="text-amber-600 mb-2" size={24} />
              <h3 className="font-medium text-amber-900 mb-1">
                {content.contactInfo.contactTitle}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {content.contactInfo.phone}
                <br />
                {content.contactInfo.email}
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
