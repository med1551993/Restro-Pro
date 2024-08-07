/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#343434",
        greenBtn: "#70b56a",
        greenBtnHover: "#5c9757",
        dashBg: "#ecf1ea",
        dashBgHover: "#dde8db",
        dashBorder: "#f0f0f0",
        dashGrayText: "#bdbdbd",
      },
      fontFamily: {
        body: ["Nunito"],
      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleY(0)" },
          "80%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(1)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
        "spin-reverse": "spin-reverse 1s linear infinite",
      },
    },
  },
  plugins: [],
};
