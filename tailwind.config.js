/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#d4c7f3",
          100: "#c6b5ef",
          200: "#b8a2eb",
          300: "#aa8fe6",
          400: "#9c7de2",
          500: "#8d6ade",
          600: "#7f58da",
          700: "#7145d6",
          800: "#663ec1",
          900: "#5a37ab",
        },
        secondary: "#e91e63",
        tertiary: "#0080ff",
        error: "#ff6f00",
        github: "#171515",
      },
      fontFamily: {
        auth: ["Roboto", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 750ms ease-in-out 1s 1 forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
