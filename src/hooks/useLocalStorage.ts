import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const getValue = () => {
    const storage = localStorage.getItem(key)
    if (storage === null) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      return JSON.parse(storage)
    }
  }
  const [value, setValue] = useState<T>(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}
