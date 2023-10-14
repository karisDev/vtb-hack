/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    borderRadius: {
      base: "14px",
    },
    extend: {
      colors: {
        primary: "#0062FF",
        status: {
          ok: "#1BA049",
          warning: "#FFC400",
          error: "#D92020",
        },
        text: {
          primary: "#222222",
          secondary: "#8b8b8b",
        },
        bg: {
          primary: "#FFF",
          secondary: "#EBEBEB",
        },

        button: {
          primary: {
            bg: "#0062FF",
            text: "#FFF",
          },
          disabled: {
            bg: "#EBEBEB",
            text: "#8b8b8b",
          },
        },
        input: {
          primary: {
            bg: "#FFF",
            text: "#222222A3",
          },
          secondary: {
            bg: "#EBEBEB",
            text: "#222222",
            placeholder: "#8b8b8b",
          },
        },
      },
      boxShadow: {
        sidebar: "0px 0px 64px 0px rgba(0, 0, 0, 0.16)",
        primary: "0px 0px 36px 0px rgba(0, 56, 255, 0.48)",
      },
    },
  },
  plugins: [],
};
