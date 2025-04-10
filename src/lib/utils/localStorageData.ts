type Key = "accessToken"

export const setLocalStorageItem = (key: Key, value: string): void => {
   const serializedValue = JSON.stringify(value)
   localStorage.setItem(key, serializedValue)
}

export const getLocalStorageItem = (key: Key): string | null => {
   const serializedValue = localStorage.getItem(key)
   if (!serializedValue) {
      return null
   }
   return JSON.parse(serializedValue)
}

export const removeLocalStorageItem = (key: Key): void => {
   localStorage.removeItem(key)
}
