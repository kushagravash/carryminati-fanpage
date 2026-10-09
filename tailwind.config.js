export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111114',
        graphite: '#202024',
        paper: '#F5F3EF',
        concrete: '#99958F',
        vermilion: '#C54432',
        gold: '#D5A13C',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
