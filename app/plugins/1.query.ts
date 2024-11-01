import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { dehydrate, type DehydratedState, hydrate, QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { deserialize, serialize } from '@wagmi/vue'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000 } },
  })

  nuxt.vueApp.use(VueQueryPlugin, {
    queryClient,
    queryClientConfig: {
      defaultOptions: {
        queries: {
          gcTime: 1_000 * 60 * 60 * 24, // 24 hours
          networkMode: 'offlineFirst',
          refetchOnWindowFocus: false,
          retry: 0,
        },
        mutations: { networkMode: 'offlineFirst' },
      },
    }
  })

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
    persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({
        key: 'vite-vue.cache',
        serialize,
        storage: window.localStorage,
        deserialize,
      }),
    })
  }
})
