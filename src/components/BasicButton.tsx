"use client";

import React from "react";

interface BasicButtonProps {
  onClick: () => void;
  text: string;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export default function BasicButton({
  onClick,
  text,
  color = "primary",
  size = "medium",
}: BasicButtonProps) {
  // Define inline styles to avoid CSS issues
  const styles = {
    button: {
      display: "inline-block",
      padding:
        size === "small"
          ? "6px 12px"
          : size === "medium"
          ? "8px 16px"
          : "10px 20px",
      fontSize: size === "small" ? "14px" : size === "medium" ? "16px" : "18px",
      fontWeight: 500,
      textAlign: "center" as const,
      whiteSpace: "nowrap" as const,
      verticalAlign: "middle",
      cursor: "pointer",
      userSelect: "none" as const,
      border: "none",
      borderRadius: "6px",
      transition: "background-color 0.2s ease",
      backgroundColor: color === "primary" ? "#d97706" : "#fbbf24",
      color: color === "primary" ? "#ffffff" : "#92400e",
    },
  };

  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
}
