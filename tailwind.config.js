export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slategray: "#3D4A5C",
        primaryBlue: {
          DEFAULT: "#2d75b9",
          50: "rgba(45, 117, 185, 0.05)",
          100: "rgba(45, 117, 185, 0.1)",
          200: "rgba(45, 117, 185, 0.2)",
          500: "#2d75b9",
        },
      },
    },
  },
  plugins: [],
};
