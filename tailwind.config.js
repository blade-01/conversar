/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
 module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        btn: {
          primary: '#EEEEEE',
          secondary: '#5047EB',
          dark: '#29292C',
          darkSec: '#27293D',
        },
        text: {
          primary: '#040404',
          secondary: '#213547',
          dark: '#ffffff',
          darkSec: 'rgba(255, 255, 255, 0.6)',
          placeholder: "rgba(4, 4, 4, 0.54)",
          darkPlaceholder: "rgba(255, 255, 255, 0.54)",
          disabled: "#d1d5db",
          darkDisabled: "#1E1E1E",
          focus: "#374151",
          darkFocus: "#1E1E1E",
          link: "#5047EB",
          darkLink: "#5047EB",
          hover: "#5047EB",
          darkHover: "#5047EB",
          label: "#374151",
          darkLabel: "#ffffff",
        },
        border: {
          primary: '#EEEEEEC',
          secondary: '#213547',
          dark: '#3A3A3A',
          darkSec: '#27293D',
          focus: '#374151',
          darkFocus: 'rgba(255, 255, 255, 0.8)',
          disabled: '#d1d5db',
          darkDisabled: '#1E1E1E',
          topbar: '#e4e4e4',
          darkTopbar: '#2F2E31',
        },
        bg: {
          primary: '#ffffff',
          secondary: '#5047EB',
          dark: '#121316',
          darkSec: '#1C1D21',
          focus: '#374151',
          darkFocus: '#1E1E1E',
          disabled: '#f9fafb',
          darkDisabled: '#1E1E1E',
          thumb: "#d8d8d8",
          darkThumb: "#fefefe",
          track: "#f9fafb",
          darkTrack: "#27293D",
          channelBar: "#ffffff",
          darkChannelBar: "#1C1D21",
          sidebar: "#fafafa",
          darkSidebar: "#1A1B1E",
          topbar: "#fafafa",
          darkTopbar: "#191A1D",
          input: "#eeeeee",
          darkInput: "#29292c",
          sidebarLink:'#EEEEEE',
          darkSidebarLink:'#27292D',
        },
        hover: {
          sidebar: '#00000042'
        },
        dark: {
          primary: '#121316',
          secondary: '#27293D',
        },
        light: {
          primary: '#eef1f8',
          secondary: '#213547',
        },
        dropdown: {
          checkbox: '#bbbbbbb3',
          darkCheckbox: '#64748b',
        },
        file: {
          dark: '#d8d8d8'
        },
        accent: {
          primary: '#27293D',
          secondary: '#FFD700',
          dark: '#64748b',
          darkSec: '#27293D',
        },
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif']
      },
      fontSize: {
        nl: ['56px', '64px']
      },
      screens: {
        '2xs': '200px',
        '1xs': '350px',
        '1xl': '1400px',
        '3xl': '2000px'
      },
    }
  },
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    `node_modules/tailvue/dist/tailvue.es.js`,
  ],
  // variants: {
  //   backgroundColor: [
  //     'dark',
  //     'dark-hover',
  //     'dark-group-hover',
  //     'dark-even',
  //     'dark-odd'
  //   ],
  //   borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
  //   textColor: ['dark', 'dark-hover', 'dark-active']
  // }
};