// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    'nuxt-content-twoslash',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  devtools: { enabled: true },

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
          'remark-reading-time': {},
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

  future: {
    compatibilityVersion: 5,
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    viewTransition: true,
    viteEnvironmentApi: true,
  },

  compatibilityDate: '2025-10-25',

  nitro: {
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      wrangler: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'enpitsulin-dev-db',
            database_id: '660627a1-e2a8-442d-9a16-6271d5f499a7',
          },
        ],
      },
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      autoSubfolderIndex: false,
    },
    replace: {
      // workaround for `https://github.com/nitrojs/nitro/issues/3071`
      'typeof window': 'typeof window',
    },
    unenv: {
      alias: {
        'typeof window': '"undefined"',
      },
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
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
  twoslash: {

  },
})
