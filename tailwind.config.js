/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "530px" }, // Less than 575px
      md: "531px", // 575px and above
    },
  },
  plugins: [],
};

// 575 Breakpoint
