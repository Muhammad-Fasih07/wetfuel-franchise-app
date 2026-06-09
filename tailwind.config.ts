import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        background: "var(--bg-main)",
        surface: "var(--bg-surface)",
        "surface-hover": "var(--bg-surface-hover)",
        primary: {
          DEFAULT: "var(--primary-brand)",
          muted: "var(--primary-brand-muted)",
          hover: "var(--primary-hover)",
        },
        border: {
          subtle: "var(--border-subtle)",
          focus: "var(--border-focus)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        success: {
          DEFAULT: "var(--success-text)",
          bg: "var(--success-bg)",
        },
        warning: {
          DEFAULT: "var(--warning-text)",
          bg: "var(--warning-bg)",
        },
        error: {
          DEFAULT: "var(--error-text)",
          bg: "var(--error-bg)",
        },
        info: "var(--info-text)",
        accent: "var(--accent-purple)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        full: "var(--radius-full)",
      },
    },
  },
  plugins: [],
};

export default config;
