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
        ':not(pre) > code::before,:not(pre) > code::after': {
          content: 'normal',
        },
        'table': {
          'display': 'table',
          'table-layout': 'auto',
          'margin-bottom': '2em',
          'font-size': '.865rem',
          'line-height': '1.25rem',
          'text-align': 'left',
          'width': '100%',
        },
        'td,th': {
          border: 'unset',
        },
        'thead tr': {
          'border-bottom-width': '1px',
          'border-bottom-color': 'hsl(var(--theme-border) / 0.5)',
        },
        'tbody tr:not(:last-child),tbody tr:first-child:last-child': {
          'border-bottom-color': 'hsl(var(--theme-border))',
          'border-bottom-width': '1px',
        },
      },
    }),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: ['400', '500', '700'],
        },
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
