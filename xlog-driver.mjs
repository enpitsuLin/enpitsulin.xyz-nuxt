import { xLogStorageDriver } from 'unstorage-xlog-driver'

export default (opt) => {
  console.log('xlog driver setup')
  return xLogStorageDriver(opt)
}
