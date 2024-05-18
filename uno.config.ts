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
  preflights: [
    {
      getCSS() {
        return `:root{
          --theme-accent: 210 40% 98%; /* #f8fafc */
        }
        .dark {
          --theme-accent: 217 33% 17%; /* #1e293b */
        }`
      },
    },
    {
      getCSS: () => `
      .dark ::-webkit-scrollbar-thumb,.dark ::-webkit-scrollbar-thumb:hover {
        border: 3px solid #3f3f46
      }
      
      .dark ::-webkit-scrollbar,.dark ::-webkit-scrollbar-thumb:hover {
        background: #27272a;
      }
      ::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:hover {
        background-color: initial;
        border: 3px solid #d4d4d8;
        border-radius: 5px
      }
      
      ::-webkit-scrollbar {
          width: 5px !important;
          height: 5px !important;
          background: #f4f4f5
      }
      
      ::-webkit-scrollbar-thumb {
          background: var(--theme-accent, 1))
      }
      
      ::-webkit-scrollbar-thumb:hover {
          background: var(--theme-accent, 0.8))
      }
      
      ::-webkit-scrollbar-corner {
          background: #f4f4f5
      }`,
    },
  ],
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
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
