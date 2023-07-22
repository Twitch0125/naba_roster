import { presetAnu, presetIconExtraProperties } from "anu-vue";
import { presetThemeDefault } from "@anu-vue/preset-theme-default";
import {
  defineConfig,
  presetUno,
  presetWebFonts,
  presetIcons,
  transformerVariantGroup,
} from "unocss";
export default defineConfig({
  content: {
    pipeline: {
      include: [/.*\/anu-vue\.js(.*)?$/, "./**/*.vue", "./**/*.md"],
    },
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: presetIconExtraProperties,
    }),
    // anu-vue preset
    presetAnu(),
    // default theme preset
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: ["Switzer"],
        display: ["Teko", "sans-serif"],
      },
    }),
    presetThemeDefault(),
  ],
  theme: {
    colors: {
      gray: {
        //tailwind stone colors
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09",
      },
    },
  },
});
