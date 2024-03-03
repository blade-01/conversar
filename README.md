<p align='center'>
  <img src='public/screenshot.png' alt='Boost your productivity with Vue Boost - work smarter, not harder.'/>
</p>
<br/>

<p align='center'>
NuxtBoost
</p>

<br>

<p align='center'>
Inspired by <a href="https://github.com/blade-01/vueboost">Vue Boost</a>
</p>

<br>

<p align='center'>
<a href="https://nuxt-boost.vercel.app/">Live Demo</a>
</p>

<br>

<!-- omit in toc -->
## Table of Contents

- [Features](#features)
- [Pre-Packed](#pre-packed)
  - [UI Frameworks](#ui-frameworks)
  - [Icons](#icons)
  - [Reuseable Components](#reuseable-components)
  - [Composables](#composables)
  - [Nuxt Modules](#nuxt-modules)
  - [Plugins](#plugins)
  - [Coding Style](#coding-style)
  - [DevTools](#dev-tools)
- [Try It Now!](#try-it-now)
- [Checklist](#checklist)
- [Usage](#usage)
- [Why](#why)
- [Acknowledgments](#acknowledgments)

## Features

- [💚 Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.

<!-- - ⚡️ Vite - Instant HMR -->

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

<!-- - 📲 [PWA](https://github.com/antfu/vite-plugin-pwa) -->

- 🎨 [TailwindCSS](https://tailwindcss.com/)

- 😃 [Use icons from Iconify](https://iconify.design)

- 🌍 [I18n ready](./locales)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 APIs auto importing - use Composition API and others directly

- 🧩 [Reuseable Components](#reuseable-components) - a little something to improve productivity

- 🦾 TypeScript, of course

<br>

## Pre-packed

### UI Frameworks

- [Prime Vue](https://primevue.org/) - The Most Complete UI Suite for Vue.js
- [TailwindCSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.js.org)

### Reuseable Components

- [Parent Folder](/components/Ui/)
  - [Button](/components/Ui/Btn/index.vue) - Reusable button component
  - [Input](/components/Ui/Input/Field.vue) - Form input component (Types: text, email, textarea etc.)
  - [File](/components/Ui/Input/File.vue) - File upload component
  - [Textarea](/components/Ui/Input/Password.vue) - Textarea component
  - [Phone](/components/Ui/Input/Phone.vue) - Phone number validation component
  - [Dropdown](/components/Ui/Input/Dropdown.vue) - Dropdown component
  - [MultiSelect](/components/Ui/Input/MultiSelect.vue) - MultiSelect component
  - [Number](/components/Ui/Input/Number.vue) - Number Input component
  - [Radiobutton](/components/Ui/Input/Radiobutton.vue) - Radio Button component
  - [Switch](/components/Ui/Input/Switch.vue) - Switch component
  - [Checkbox](/components/Ui/Input/Checkbox.vue) - Checkbox component
  - [DatePicker](/components/Ui/Input/DatePicker.vue) - Date Picker component
  - [Table](/components/Ui/Data/Table.vue) - Data table component
  - [Modal](/components/Ui/Modal.vue) - Reusable modal component
    - [Side](/components/Ui/Modal/Side.vue) - Side modal component (left, right, top, bottom)
    - [Center](/components/Ui/Modal/Center.vue) - Center modal component
- [Samples Folder](/pages/dashboard/)
  - You can find out how to use these components by clicking [Dashboard Folder](/pages/dashboard/) or visit [NuxtBoost Dashboard](https://nuxt-boost.vercel.app) for the visualization

### Composables

- [Utils](/utils/index.ts) - Main utility has encompasses basic day-to-day functions.
- [Theme](/composables/useTheme.ts) - Theme switch composable.
- [PrimeVue Styles](/composables/usePvStyle.ts) - PrimeVue styling composable.
- [Shortcut Keys](/composables/useShortcut.ts) - Shortcut composable (save, esc etc...), an example of this can be seen on dashboard collapsible.
- [Sidebar](/composables/useSidebarUtils.ts) - Dashboard sidebar composable.
- [Validation Schema](/composables/useValidations.ts) - VeeValidate validation schemas composable.

### Nuxt Modules

- [Nuxt Devtools](https://nuxt.com/modules/devtools) - Unleash Nuxt Developer Experience.
- [VueUse](https://nuxt.com/modules/vueuse) - Collection of Vue Composition Utilities.
- [ColorMode](https://nuxt.com/modules/color-mode) - dark and Light mode with auto detection made easy with Nuxt.
- [TailwindCSS](https://nuxt.com/modules/tailwindcss) - Add Tailwind CSS to your Nuxt application in seconds with PurgeCSS included for minimal CSS.
- [Pinia](https://nuxt.com/modules/pinia) - The Vue Store that you will enjoy using.
- [Nuxt Icon](https://nuxt.com/modules/icon) - Icon module for Nuxt with 100,000+ ready to use icons from Iconify.
- [Nuxt Image](https://nuxt.com/modules/image) - Optimised images for Nuxt, with progressive processing, lazy-loading, real-time resizes and providers support.
- [Tailvue](https://nuxt.com/modules/tailvue) - Vue components built for Vue3 powered by Windi CSS or tailwindcss.
- [Headless UI](https://nuxt.com/modules/headlessui) - Headless UI integration for Nuxt. Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
- [i18n](https://nuxt.com/modules/i18n) - i18n features for your Nuxt project so you can easily add internationalization.

### Plugins

- [PrimeVue](https://primevue.org/) - The Most Complete UI Suite for Vue.js.
- [VeeValidate](https://vee-validate.logaretm.com/v4/) - Painless Vue forms.
- [Vue Tel Input](https://vue-tel-input.iamstevendao.com/guide/getting-started.html) - International Telephone Input with Vue

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/).

### Dev tools

- [Nuxt Dev tools](https://nuxt.com/modules/devtools)
- [TypeScript](https://www.typescriptlang.org/)
- [VS Code Extensions](./.vscode/extensions.json)
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Icon inline display and autocomplete
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Try it now!

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/blade-01/NuxtBoost/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit blade-01/nuxtboost my-template
cd my-template
pnpm i or yarn i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the title and configurations in `nuxt.config.ts`
- [ ] Change the favicon in `public`
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3000

```bash
pnpm dev
```

OR

```bash
yarn dev
```

### Build

To build the App, run

```bash
pnpm build
```

OR

```bash
yarn build
```

And you will see the generated file in `dist` that is ready to be served.

### Deploy

Deploy anywhere.

## Why

To boost our collective productivity as developers.


## Acknowledgments

I would like to express my gratitude to the following individuals:

- **Jahid Anowar**: In memory of my dear mentor, a friend, and a remarkable leader, whose guidance and support have been an unwavering pillar in my journey as a developer. Whenever I stumbled into coding challenges, [Jahid](https://jahid.dev/) was the guiding light, offering invaluable insights and solutions. His mentorship went beyond just coding; he generously shared his wisdom, helped me secure job opportunities, and imparted invaluable lessons that shaped my career. His commitment to excellence was tireless, evident in every project he touched. Much of the essence embedded within this project was inspired by the profound wisdom I gained while working alongside him on his codebase. His profound impact on my career cannot be overstated; he has forever shaped my trajectory. Rest in peace, my Nuxt Wizard. Your legacy will endure, and your teachings will continue to guide me forward 🖤

- **Friends and Family**: This wouldn't have been possible without support from friends and family, I really appreciate y'all.

- **Myself**: Lastly, I want to thank [me](https://www.youtube.com/watch?v=wGRF3GQ4Wdk).