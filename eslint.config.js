// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
).append(nuxt({
  rules: {
    'vue/no-multiple-template-root': 'off',
  },
}))
