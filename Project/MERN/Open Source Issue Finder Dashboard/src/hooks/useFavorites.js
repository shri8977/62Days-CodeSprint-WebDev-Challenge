import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'osif-favorites'

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readFavorites())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback((issue) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === issue.id)
      if (exists) {
        return prev.filter((f) => f.id !== issue.id)
      }
      return [
        {
          id: issue.id,
          number: issue.number,
          title: issue.title,
          htmlUrl: issue.htmlUrl,
          repoFullName: issue.repoFullName,
          labels: issue.labels,
          savedAt: new Date().toISOString(),
        },
        ...prev,
      ]
    })
  }, [])

  const clearFavorites = useCallback(() => setFavorites([]), [])

  return { favorites, isFavorite, toggleFavorite, clearFavorites }
}
