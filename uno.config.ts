import { defineConfig, presetUno, presetWebFonts } from "unocss";
export default defineConfig({
  content: {
    pipeline: {
      include: ["**/*.vue", "**/*.ts"],
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "DM Sans, sans-serif",
      },
    }),
  ],
  shortcuts: [
    {
      "theme.background": "bg-blue-100/50",
      "theme.surface": "bg-slate-50",
      "theme.border": "border-color-slate-800 border-width-1 border-solid",
      "theme.text-primary": "text-slate-900",
      "theme.primary": "bg-slate-900",
      "theme.button": "theme.primary text-white px-3 py-2 uppercase tracking-wide text-sm font-medium"
    },
  ],
  // theme: {
  //   colors:[
  //     background: "hsla()"
  //   ]
  // },
  // rules: [
  //   [
  //     /theme.background/,
  //     (_, { theme }) => {
  //       theme.colors.background
  //     },
  //   ],
  // ],
});
