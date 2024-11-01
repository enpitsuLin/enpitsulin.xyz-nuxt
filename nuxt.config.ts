import { pathToFileURL } from 'node:url'
import { createResolver } from '@nuxt/kit'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, componentInspector: false },

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
    markdown: {
      remarkPlugins: {
        'remark-unwrap-images': {

        },
        'remark-reading-time': {

        },
        'remark-directive': {},
        'remark-directive-rehype': {},
        'remark-mdc': false,
      },
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'vue', 'bash', 'md', 'mdc', 'yaml', 'toml', 'rust', 'sql'],
    },
    sources: {
      xlog: {
        driver: pathToFileURL(resolver.resolve('./storage/xlog-driver.mjs')).href,
        characterId: 54315,
        baseURL: 'https://ipfs.crossbell.io/ipfs/',
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
  vite: {
    resolve: {
      alias: {
        process: 'process/browser',
        util: 'util',
      },
    },
    plugins: [
      nodePolyfills({
        globals: { Buffer: true, process: true },
      }),
    ],
    build: { target: 'esnext' },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },
    },
  },
  
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  compatibilityDate: '2024-07-09',
})
