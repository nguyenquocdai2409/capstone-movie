/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  mode: "jit",
  theme: {
    extend: {
      height: {
        600: "600px",
        viewH80: "80vh",
        viewH40: "40vh",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
