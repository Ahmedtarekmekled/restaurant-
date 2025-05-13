"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MenuImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function MenuImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = "",
  priority = false,
}: MenuImageProps) {
  const [isError, setIsError] = useState(false);
  const { t } = useLanguage();

  // Check if the image is from an external domain
  const isExternalImage =
    src.startsWith("http") && !src.includes("restaurant-neon-psi.vercel.app");

  // Use a fallback image URL if there's an error
  const fallbackImageUrl = "https://placehold.co/600x400?text=Image+Not+Found";

  const handleError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : fill ? "100%" : "300px",
          height: height ? `${height}px` : fill ? "100%" : "200px",
          position: fill ? "absolute" : "relative",
          inset: fill ? 0 : undefined,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          borderRadius: "0.75rem",
          padding: "16px",
          textAlign: "center",
          border: "1px dashed #D97706",
          boxShadow: "inset 0 0 0 1px rgba(217, 119, 6, 0.1)",
        }}
      >
        <ImageIcon size={36} style={{ marginBottom: "8px", opacity: 0.8 }} />
        <p style={{ fontSize: "14px", fontWeight: "500", maxWidth: "80%" }}>
          {t("imageNotFound")}
        </p>
      </div>
    );
  }

  // Use regular img tag for external images to avoid Next.js image optimization issues
  if (isExternalImage) {
    if (fill) {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
          className={className}
        >
          <img
            src={src}
            alt={alt || "Menu item"}
            onError={(e) => {
              e.currentTarget.src = fallbackImageUrl;
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt || "Menu item"}
        width={width || 300}
        height={height || 200}
        className={className}
        onError={(e) => {
          e.currentTarget.src = fallbackImageUrl;
          e.currentTarget.onerror = null; // Prevent infinite loop
        }}
        style={{ objectFit: "cover" }}
      />
    );
  }

  // Use Next.js Image component for internal images
  return fill ? (
    <Image
      src={src}
      alt={alt || "Menu item"}
      fill
      priority={priority}
      sizes={
        sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      }
      className={className}
      onError={handleError}
      style={{ objectFit: "cover" }}
      unoptimized={isExternalImage}
    />
  ) : (
    <Image
      src={src}
      alt={alt || "Menu item"}
      width={width || 300}
      height={height || 200}
      priority={priority}
      className={className}
      onError={handleError}
      style={{ objectFit: "cover" }}
      unoptimized={isExternalImage}
    />
  );
}
