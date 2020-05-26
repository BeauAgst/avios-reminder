import offsetDate from './offset-date'

const STORAGE_PREFIX = 'baar'

const hasExpired = function hasExpired(timestamp = 0): boolean {
  const now = new Date().getTime()
  return timestamp < now
}

const typeMap: {
  [key: string]: typeof localStorage | typeof sessionStorage
} = {
  local: localStorage,
  session: sessionStorage,
}

export default (storageType = 'local') => {
  const storage = typeMap[storageType]

  return {
    get(key: string): StorageItem | null {
      const item = storage.getItem(`${STORAGE_PREFIX}-${key}`)
      if (!item) return null
      const { data, expiry } = JSON.parse(item)
      if (hasExpired(expiry)) {
        this.remove(`${STORAGE_PREFIX}-${key}`)
        return null
      }
      return data
    },
    remove(key: string): void {
      storage.removeItem(`${STORAGE_PREFIX}-${key}`)
    },
    set(key: string, value: unknown, expiry = offsetDate({ days: 1 })): void {
      const data = JSON.stringify({ expiry: expiry.getTime(), data: value })
      storage.setItem(`${STORAGE_PREFIX}-${key}`, data)
    },
  }
}