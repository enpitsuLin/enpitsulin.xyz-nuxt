// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/image',
  ],

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    viewTransition: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-reading-time': {

          },
          'remark-directive': {},
          'remark-directive-rehype': {},
          'remark-mdc': false,
        },
        rehypePlugins: {
          'rehype-unwrap-images': {},
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'vue', 'bash', 'md', 'mdc', 'yaml', 'toml', 'rust', 'sql'],
        },
      },
    },
  },

  image: {
    providers: {
      ipfs: {
        name: 'ipfs', // optional value to overrider provider name
        provider: '~/providers/ipfs.ts', // Path to custom provider
        options: {
          baseURL: 'https://ipfs.crossbell.io/ipfs/',
        },
      },
    },
  },

  compatibilityDate: '2025-04-05',
})
