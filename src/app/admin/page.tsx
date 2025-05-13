"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AdminRedirect = () => {
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/dashboard/login");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      direction: isRTL ? "rtl" : ("ltr" as React.CSSProperties["direction"]),
    },
    content: {
      display: "flex",
      flexDirection: "column" as React.CSSProperties["flexDirection"],
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
    },
    text: {
      fontSize: "1.25rem",
      fontWeight: "500",
      color: "#4b5563",
      marginTop: "1rem",
      textAlign: "center" as React.CSSProperties["textAlign"],
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Loader2 size={40} className="animate-spin text-amber-600" />
        <div style={styles.text}>{t("redirectingToLogin")}</div>
      </div>
    </div>
  );
};

export default AdminRedirect;
