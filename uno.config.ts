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
      include: ["**/*.vue", "**/*.ts"],
    },
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sans: ["Switzer"],
        display: ["Teko", "sans-serif"],
      },
    }),
  ],
  shortcuts: [
    {
      "theme.background": "bg-gray-100",
      "theme.surface": "bg-white",
      "theme.border": "border-color-gray-200",
      "theme.text-primary": "text-gray-900",
      "theme.primary": "bg-primary",
      "theme.button":
        "theme.primary text-white px-3 py-2 uppercase tracking-wide text-sm font-medium",
        "theme.button-text":
        "text-primary px-3 py-2 uppercase tracking-wide text-sm font-medium",
    },
  ],
  theme: {
    colors: {
      gray: {
        //tailwind slate colors
        // 50: "#f8fafc",
        // 100: "#f1f5f9",
        // 200: "#e2e8f0",
        // 300: "#cbd5e1",
        // 400: "#94a3b8",
        // 500: "#64748b",
        // 600: "#475569",
        // 700: "#334155",
        // 800: "#1e293b",
        // 900: "#0f172a",
        // 950: "#020617",
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
      primary: "#274328",
      "primary-bg": "#e2ebe2",
    },
  },
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    [
      /^border-color-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { "border-color": theme.colors[c] };
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { "background-color": theme.colors[c] };
      },
    ],
  ],
});
