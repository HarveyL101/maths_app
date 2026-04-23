export default {
  content: ["./index.html", "./src/**/*.{js,jsx,}"],
  theme: {
    extend: {
      colors: {
        primary: '#53096E',
        secondary: '#9912CB',
        accent: '#1A919F',

        bg: {
          light: '#EDEDED',
          dark: '#1A1A1A',
        },

        text: {
          light: '#111111',
          dark: '#FFFFFF',
        },

        surface: {
          light: '#FFFFFF',
          dark: '#2A2A2A',
        }
      },
    }
  }
}