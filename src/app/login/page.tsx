"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(t("loginError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fef3c7",
      padding: "20px",
      direction: isRTL ? "rtl" : ("ltr" as React.CSSProperties["direction"]),
      fontFamily: "sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px 30px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center" as React.CSSProperties["textAlign"],
      color: "#b45309",
      marginBottom: "20px",
      fontFamily: "inherit",
    },
    errorBox: {
      backgroundColor: "#fecaca",
      color: "#b91c1c",
      padding: "10px 15px",
      borderRadius: "4px",
      marginBottom: "15px",
      fontSize: "14px",
      textAlign: "center" as React.CSSProperties["textAlign"],
    },
    credentialsBox: {
      border: "1px solid #facc15",
      padding: "15px",
      borderRadius: "4px",
      marginBottom: "20px",
      backgroundColor: "#fef9c3",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      color: "#525252",
      textAlign: isRTL ? "right" : ("left" as React.CSSProperties["textAlign"]),
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box" as React.CSSProperties["boxSizing"],
      color: "#1f2937",
      backgroundColor: "white",
    },
    inputWrapper: {
      position: "relative" as React.CSSProperties["position"],
      width: "100%",
      marginBottom: "15px",
    },
    passwordInput: {
      width: "100%",
      padding: "10px 12px",
      paddingRight: "40px",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      fontSize: "16px",
      boxSizing: "border-box" as React.CSSProperties["boxSizing"],
      direction: "ltr" as React.CSSProperties["direction"],
      color: "#1f2937",
      backgroundColor: "white",
    },
    togglePasswordBtn: {
      position: "absolute" as React.CSSProperties["position"],
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#4B5563",
      padding: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#b45309",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "15px",
    },
    backLink: {
      marginTop: "15px",
      textAlign: "center" as React.CSSProperties["textAlign"],
      display: "block",
      color: "#b45309",
      textDecoration: "none",
      fontSize: "14px",
    },
    spinner: {
      marginRight: isRTL ? "0" : "8px",
      marginLeft: isRTL ? "8px" : "0",
    },
    iconSpace: {
      marginRight: isRTL ? "0" : "8px",
      marginLeft: isRTL ? "8px" : "0",
    },
  };

  return (
    <div style={buttonStyles.container}>
      <div style={buttonStyles.card}>
        <h1 style={buttonStyles.heading}>{t("adminLogin")}</h1>

        {errorMsg && <div style={buttonStyles.errorBox}>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="username" style={buttonStyles.label}>
              {t("username")}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={buttonStyles.input}
              required
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="password" style={buttonStyles.label}>
              {t("password")}
            </label>
            <div style={buttonStyles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={buttonStyles.passwordInput}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={buttonStyles.togglePasswordBtn}
                aria-label={
                  showPassword ? t("hidePassword") : t("showPassword")
                }
              >
                {showPassword ? (
                  <EyeOff size={18} color="#64748b" />
                ) : (
                  <Eye size={18} color="#64748b" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={buttonStyles.loginButton}
            onMouseOver={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = "#B45309";
            }}
            onMouseOut={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = "#D97706";
            }}
          >
            {isLoading ? (
              <>
                <span style={buttonStyles.spinner}></span>
                <style jsx>{`
                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
                {t("loggingIn")}
              </>
            ) : (
              <>
                <LogIn size={18} style={buttonStyles.iconSpace} />
                {t("login")}
              </>
            )}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          <Link
            href="/"
            style={buttonStyles.backLink}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#FDE68A";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFBEB";
            }}
          >
            <Home size={16} style={buttonStyles.iconSpace} />
            {t("backToMenu")}
          </Link>
        </div>
      </div>
    </div>
  );
}
