import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from '@unocss/preset-uno'

export default defineConfig<Theme>({
  theme: {
    colors: {
      accent: 'hsl(var(--theme-accent))',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
    }),
    presetTypography({
      cssExtend: {
        'pre': {
          padding: '0',
        },
        'p,ul,ol,pre': {
          margin: '0',
        },
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Manrope',
        serif: 'Noto Serif SC',
        mono: {
          provider: 'none',
          name: 'MonaspiceArNerdFont',
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
