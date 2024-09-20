import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        "darkBg":"#1b1b22",
        "darkBlue":"#2c2c3e",
        "darkHover":"#1b1b22",
        "lightBg":"#f3f4f6",
        "indigo500": "#6366f1",
        "bs-dark" : "#344767",
        "bs-success": '#82d616',
        "hover-success": '#6fb80f',
      },
    },
  },
  plugins: [],
};
export default config;
