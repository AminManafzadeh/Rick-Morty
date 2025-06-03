/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "rgb(100, 116, 139)",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
        },
        rose: {
          600: "#e11d48",
          500: "#f43f5e",
        },
        green: {
          600: "#22c55e",
        },
      },
      boxShadow: {
        box_shadow: "1px 1px 50px #475569",
      },
    },
  },
  plugins: [],
};
