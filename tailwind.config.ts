import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ce1c1a",
          redHover: "#bf2524",
          redActive: "#cd171a",
          black: "#2b2b2b",
          blackDeep: "#17140b",
          charcoal: "#282a2c",
          taupe: "#887b6a",
          lightGray: "#f5f5f5",
          softPink: "#f0797a",
          rose: "#ca5f68",
          white: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
