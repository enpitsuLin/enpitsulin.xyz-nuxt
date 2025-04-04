// @ts-check
import { createIndexer } from 'crossbell'
import { parseFrontMatter, stringifyFrontMatter } from 'remark-mdc'
import { createStorage, defineDriver } from 'unstorage'

import fs from 'unstorage/drivers/fs'

export interface XLogStorageDriverOptions {
  characterId: number
  ttl: number
  baseURL: string
}

/** @type {import('unstorage').Storage<string>} */
const fileCache: import('unstorage').Storage<string> = createStorage({
  driver: fs({
    base: '.data/xlog',
  }),
})

const indexer = createIndexer()

const DRIVER_NAME = 'xLog-driver'
const LIMIT = 100
const SOURCE = 'xlog'

async function fetchNote(
  options: XLogStorageDriverOptions,
  type: 'markdown' | 'json',
  prefixAsTag: string,
) {
  try {
    const characterId = Number(options.characterId)
    const ipfsGatewayBaseURL = options.baseURL
    const rawRes = await indexer.note.getMany({
      characterId,
      includeNestedNotes: false,
      limit: LIMIT,
      sources: SOURCE,
      tags: prefixAsTag,
    })
    const lists = rawRes.list ?? []
    for (const i of lists) {
      if (type === 'markdown') {
        const attributes = i.metadata?.content?.attributes ?? []
        const slug = attributes.find(item => item.trait_type === 'xlog_slug')?.value?.toString() ?? `note-${i.noteId}`
        const summary = i.metadata?.content && 'summary' in i.metadata?.content ? /** @type {string} */(i.metadata?.content.summary) : ''
        const body = i.metadata?.content?.content ?? ''

        const tags = (i.metadata?.content?.tags ?? []).filter(tag => tag !== prefixAsTag)
        const { content, data } = parseFrontMatter(body)

        const markdownText = stringifyFrontMatter(
          {
            ...data,
            uri: i.uri?.replace(
              /ipfs:\/\/([^\n ]+)/g,
              `${ipfsGatewayBaseURL}$1`,
            ) ?? '',
            createAt: i?.createdAt ?? '',
            updateAt: i?.updatedAt ?? '',
            publishAt: i.metadata?.content?.date_published ?? '',
            title: i.metadata?.content?.title ?? '',
            tags,
            slug: slug ?? '',
            summary,
          },
          content.replace(
            /ipfs:\/\/([^\n ]+)/g,
            `${ipfsGatewayBaseURL}$1`,
          ),
        )

        await fileCache.setItem(`${prefixAsTag}:${slug}.md`, markdownText)
      }
      else {
        const attachments = i.metadata?.content?.attachments ?? []
        const cover = attachments.find(item => item.name === 'cover')?.address
        const title = i.metadata?.content?.title
        const summary = i.metadata?.content && 'summary' in i.metadata?.content ? i.metadata?.content?.summary : ''
        const external_urls = i.metadata?.content?.external_urls?.at(0)

        await fileCache.setItem(`${prefixAsTag}:${i.noteId}.json`, JSON.stringify({ id: i.noteId, cover, summary, title, href: external_urls }))
      }
    }
  }
  catch {
    throw new Error(`${DRIVER_NAME} Error: Failed`)
  }
}

export const xLogStorageDriver = defineDriver(
  (opt: XLogStorageDriverOptions) => {
    const defaultOpt = {
      ttl: 60 * 60,
      baseURL: 'https://ipfs.crossbell.io/ipfs',
    }
    const options: XLogStorageDriverOptions = {
      ...defaultOpt,
      ...opt,
    }

    let lastCheck = 0
    /** @type {Promise<[void,void,void]>|undefined} */
    let syncPromise: Promise<[void, void, void]> | undefined

    const syncFiles = async () => {
      if (!options.characterId)
        throw new Error(`${DRIVER_NAME} Error: Not set characterId`)

      if (lastCheck + options.ttl * 1000 > Date.now() && (await fileCache.getKeys()).length > 0)
        return

      if (!syncPromise) {
        syncPromise = Promise.all([
          fetchNote(options, 'markdown', 'post'),
          fetchNote(options, 'markdown', 'page'),
          fetchNote(options, 'json', 'portfolio'),
        ])
      }

      await syncPromise
        .then(() => {
          lastCheck = Date.now()
          syncPromise = undefined
        })
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
      async getItem(key: string) {
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
