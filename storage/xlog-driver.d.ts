export interface XLogStorageDriverOptions {
  characterId: number
  ttl: number
}

export interface xLogFile {
  body: string
  meta: {
    title: string
    slug: string
    tags: string[]
    uri: string
    createTime: string
    updateTime: string
    publishTime: string
  }
}
export interface XLogFileInfo {
  [prop: string]: xLogFile
}
