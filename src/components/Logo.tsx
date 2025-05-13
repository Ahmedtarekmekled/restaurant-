"use client";

import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export default function Logo({
  size = "medium",
  color = "#ffffff",
}: LogoProps) {
  // Define size parameters
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 48, height: 48 },
  };

  const { width, height } = dimensions[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Restaurant logo - a fork and knife with a plate */}
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
        <circle
          cx="12"
          cy="12"
          r="6"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 1"
        />
        <path
          d="M8 6v12M16 6v12"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 6c-1 0-2 1-2 2.5s1 2.5 2 2.5 2-1 2-2.5-1-2.5-2-2.5z"
          fill={color}
        />
        <path
          d="M8 8c0-1 .5-2 2-2M16 8c0-1-.5-2-2-2"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontSize:
            size === "small" ? "16px" : size === "medium" ? "20px" : "24px",
          fontWeight: "bold",
          fontFamily: "serif",
          color: color,
        }}
      >
        Taste Haven
      </span>
    </div>
  );
}
