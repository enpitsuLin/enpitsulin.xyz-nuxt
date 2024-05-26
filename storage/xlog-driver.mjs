// @ts-check
import { createIndexer } from 'crossbell'
import { createStorage, defineDriver } from 'unstorage'
import memory from 'unstorage/drivers/memory'

import { parseFrontMatter, stringifyFrontMatter } from 'remark-mdc'

/** @type {import('unstorage').Storage<string>} */
const fileCache = createStorage({
  driver: memory(),
})

const indexer = createIndexer()

const IPFS_GATEWAY = 'https://ipfs.4everland.xyz/ipfs/'

const DRIVER_NAME = 'xLog-driver'
const LIMIT = 100
const SOURCE = 'xlog'
const POST_TAG = 'post'

/**
 *
 * @param {import('./xlog-driver').XLogStorageDriverOptions} options
 * @returns
 */
async function fetchFiles(options) {
  try {
    const characterId = Number(options.characterId)
    const rawRes = await indexer.note.getMany({
      characterId,
      includeNestedNotes: false,
      limit: LIMIT,
      sources: [SOURCE],
      tags: [POST_TAG],
    })

    const lists = rawRes.list ?? []

    for (const i of lists) {
      const attributes = i.metadata?.content?.attributes ?? []
      const slug = attributes.find(item => item.trait_type === 'xlog_slug')?.value?.toString() ?? `note-${i.noteId}`
      const summary = i.metadata?.content && 'summary' in i.metadata?.content ? /** @type {string} */(i.metadata?.content.summary) : ''
      const body = i.metadata?.content?.content ?? ''

      const tags = (i.metadata?.content?.tags ?? []).filter(tag => tag !== POST_TAG)
      const { content, data } = parseFrontMatter(body)

      const markdownText = stringifyFrontMatter(
        {
          ...data,
          uri: i.uri ?? '',
          createTime: i?.createdAt ?? '',
          updateTime: i?.updatedAt ?? '',
          publishTime: i.metadata?.content?.date_published ?? '',
          title: i.metadata?.content?.title ?? '',
          tags,
          slug: slug ?? '',
          summary,
        },
        content.replace(
          /ipfs:\/\/([^\n ]+)/g,
          `${IPFS_GATEWAY}$1`,
        ),
      )

      await fileCache.setItem(`${slug}.md`, markdownText)
    }
  }
  catch {
    throw new Error(`${DRIVER_NAME} Error: Failed`)
  }
}

const xLogStorageDriver = defineDriver(
  (/** @type {import('./xlog-driver').XLogStorageDriverOptions} */opt) => {
    const defaultOpt = {
      ttl: 60 * 60,
    }
    /** @type {import('./xlog-driver').XLogStorageDriverOptions} */
    const options = {
      ...defaultOpt,
      ...opt,
    }

    let lastCheck = 0
    /** @type {Promise<void>|undefined} */
    let syncPromise

    const syncFiles = async () => {
      if (!options.characterId)
        throw new Error(`${DRIVER_NAME} Error: Not set characterId`)

      if (lastCheck + options.ttl * 1000 > Date.now())
        return

      if (!syncPromise)
        syncPromise = fetchFiles(options)

      await syncPromise
      lastCheck = Date.now()
      syncPromise = undefined
    }

    return {
      name: DRIVER_NAME,
      options,
      async hasItem(key) {
        await syncFiles()
        return fileCache.hasItem(key)
      },
      /**
       * @param {string} key
       * @returns
       */
      async getItem(key) {
        await syncFiles()
        return fileCache.getItem(key)
      },
      async getKeys() {
        await syncFiles()
        return fileCache.getKeys()
      },
      async getMeta(key) {
        await syncFiles()
        return fileCache.getMeta(key)
      },
    }
  },
)
export default xLogStorageDriver
