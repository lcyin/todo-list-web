/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design system colors from visual guide
        primary: "#2196F3",
        secondary: "#FF9800",
        success: "#4CAF50",
        error: "#F44336",
        warning: "#FFC107",
        // Neutral colors
        background: "#FAFAFA",
        surface: "#FFFFFF",
        textPrimary: "#212121",
        textSecondary: "#757575",
        border: "#E0E0E0",
      },
      fontFamily: {
        // Inter font family as specified in visual guide
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      fontSize: {
        // Typography from visual guide
        h1: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        // 8px grid system
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },
      borderRadius: {
        // Specified border radius values
        sm: "8px",
        lg: "12px",
      },
      maxWidth: {
        // Container max width
        container: "800px",
      },
      boxShadow: {
        // Custom shadows from visual guide
        button: "0 2px 4px rgba(33, 150, 243, 0.2)",
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 2px 8px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
