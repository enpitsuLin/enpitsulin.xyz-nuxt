// @ts-check
import antfu from '@antfu/eslint-config'
import { defineFlatConfigs } from '@nuxt/eslint-config/flat'

export default defineFlatConfigs(antfu(
  {
    unocss: true,
    formatters: true,
  },
))
