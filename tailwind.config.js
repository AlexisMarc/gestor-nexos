/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    colors: {
      white: "#ffffff",
      brand: {
        red: {
          50: "#FED4D4",
          100: "#FCA9A9",
          200: "#FB7E7E",
          300: "#FA5353",
          400: "#F92828",
          500: "#ED0707",
          600: "#CF0606",
          700: "#B20505",
          800: "#940404",
          900: "#760404",
        },
        orange: {
          50: "#FFE8D5",
          100: "#FFD0AA",
          200: "#FFB980",
          300: "#FFA255",
          400: "#FF8A2B",
          500: "#FF7300",
          600: "#CC5C00",
          700: "#994500",
          800: "#662E00",
          900: "#331700",
        },
        yellow: {
          50: "#FFF5D5",
          100: "#F4F4C6",
          200: "#FEE082",
          300: "#FDD658",
          400: "#FDCB2F",
          500: "#FCC105",
          600: "#CB9B02",
          700: "#987402",
          800: "#664E01",
          900: "#332701",
        },
        cyan: {
          50: "#D2FAFA",
          100: "#A6F6F5",
          200: "#79F1F0",
          300: "#4CEDEB",
          400: "#1FE8E6",
          500: "#14C2C0",
          600: "#109B9A",
          700: "#0C7473",
          800: "#084E4D",
          900: "#042726",
        },
        blue: {
          50: "#DEEBFD",
          100: "#BED7FB",
          200: "#9DC3F8",
          300: "#7CB0F6",
          400: "#5C9CF4",
          500: "#3B88F2",
          600: "#0F68E2",
          700: "#0B4EA9",
          800: "#073471",
          900: "#041A38",
        },
        indigo: {
          50: "#CBC9F6",
          100: "#9893EC",
          200: "#645DE3",
          300: "#3027DA",
          400: "#241CA5",
          500: "#18136F",
          600: "#130F59",
          700: "#0E0B43",
          800: "#0A082C",
          900: "#050416",
        },
        green: {
          50: "#E9F6DF",
          100: "#D2EDBF",
          200: "#A5DB80",
          300: "#78C941",
          400: "#65AF32",
          500: "#65AF32",
          600: "#518C28",
          700: "#3D691E",
          800: "#284614",
          900: "#14230A",
        },
      },
      transparent: "rgba(0, 0, 0, 0)",
      neutral: {
        50: "#FAFBFC",
        100: "#E2E8EC",
        200: "#C4D0DA",
        300: "#A7B9C7",
        400: "#8AA2B5",
        500: "#6D8BA2",
        600: "#577289",
        700: "#445A6C",
        800: "#32414E",
        900: "#1F2931",
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Nunito", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
