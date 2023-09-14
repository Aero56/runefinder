const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'anzac': {
          '50': '#fcfaea',
          '100': '#f7f2ca',
          '200': '#f1e497',
          '300': '#e9cf5b',
          '400': '#e1bb34',
          '500': '#d1a321',
          '600': '#b47f1a',
          '700': '#905d18',
          '800': '#784a1b',
          '900': '#663f1d',
          '950': '#3b200d',
        },      
        'black-pearl': {
          '50': '#e7f5fd',
          '100': '#cfe8fc',
          '200': '#88ccf6',
          '300': '#38b0f0',
          '400': '#1290d3',
          '500': '#116fa2',
          '600': '#085687',
          '700': '#074469',
          '800': '#062437',
          '900': '#05141f',
          '950': '#030c13',
        },      
      }
    },
      container: {
        center: true,
        screens: {
          md: '768px'
        },
        padding: "20px"
      },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    darkTheme: "dark", // name of one of the included themes for dark mode
    themes: [
      {
        dark: {
          "base-100": "#030C13",
          "base-content": "#bde3fa",
        },
      },
    ],
  },
};
