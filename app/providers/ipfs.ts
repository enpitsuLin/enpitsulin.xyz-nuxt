import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = (
  src,
  { baseURL = 'https://ipfs.io/ipfs' } = {},
) => {
  const url = src.replace(/ipfs:\/\/([^\n ]+)/g, `${baseURL}$1`)

  return {
    url,
  }
}
