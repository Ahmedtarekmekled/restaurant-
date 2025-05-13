"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { isLoggedIn: _ } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundImage: "linear-gradient(to right, #92400e, #b45309)",
        padding: "12px 16px",
        boxShadow: isScrolled ? "0 4px 15px -1px rgba(0, 0, 0, 0.2)" : "none",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Logo size="medium" />
        </Link>

        {/* Mobile Controls */}
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
          className="md:hidden"
        >
          {/* Language switcher on mobile */}
          <button
            onClick={toggleLanguage}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {language === "en" ? "عربي" : "EN"}
          </button>

          {/* Menu toggle on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: isMenuOpen
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            <span style={{ fontSize: "20px" }}>{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex"
          style={{
            display: "none",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            {/* Navigation links */}
            <Link
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                fontWeight: 500,
                transition: "background-color 0.2s",
                backgroundColor: "transparent",
                margin: "0 4px",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {t("menu")}
            </Link>

            <Link
              href="/about"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                fontWeight: 500,
                transition: "background-color 0.2s",
                backgroundColor: "transparent",
                margin: "0 4px",
                display: "inline-block",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {t("aboutUs")}
            </Link>
          </div>

          {/* Language switcher on desktop */}
          <button
            onClick={toggleLanguage}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "6px 16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.3)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.2)")
            }
          >
            {language === "en" ? "عربي" : "English"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 40,
              backdropFilter: "blur(3px)",
            }}
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div
            style={{
              position: "fixed",
              top: "64px",
              [isRTL ? "left" : "right"]: 0,
              width: "250px",
              height: "100vh",
              backgroundColor: "white",
              zIndex: 50,
              padding: "30px 20px",
              boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              animation: "slideIn 0.3s forwards",
            }}
          >
            <style jsx>{`
              @keyframes slideIn {
                from {
                  transform: translateX(${isRTL ? "-100%" : "100%"});
                }
                to {
                  transform: translateX(0);
                }
              }
            `}</style>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Logo size="small" color="#92400e" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link
                href="/"
                style={{
                  display: "block",
                  padding: "14px",
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 5px rgba(0,0,0,0.05)";
                }}
              >
                {t("menu")}
              </Link>
              <Link
                href="/about"
                style={{
                  display: "block",
                  padding: "14px",
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 5px rgba(0,0,0,0.05)";
                }}
              >
                {t("aboutUs")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
