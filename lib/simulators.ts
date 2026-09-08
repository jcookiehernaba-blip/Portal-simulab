'use client'

import { useCallback, useEffect, useState } from 'react'

export type Category = 'Química' | 'Física' | 'Biología'
export type Difficulty = 'Básico' | 'Intermedio' | 'Avanzado'

export const CATEGORIES: Category[] = ['Química', 'Física', 'Biología']
export const DIFFICULTIES: Difficulty[] = ['Básico', 'Intermedio', 'Avanzado']

export type Simulator = {
  id: string
  title: string
  category: Category
  difficulty: Difficulty
  url: string
  description: string
  is_favorite: boolean
  created_at: string
}

export type NewSimulator = Omit<Simulator, 'id' | 'is_favorite' | 'created_at'>

const STORAGE_KEY = 'simulab.simulators.v1'

function readStore(): Simulator[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Simulator[]) : []
  } catch {
    return []
  }
}

function writeStore(items: Simulator[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useSimulators() {
  const [simulators, setSimulators] = useState<Simulator[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSimulators(readStore())
    setLoaded(true)
  }, [])

  const persist = useCallback((updater: (prev: Simulator[]) => Simulator[]) => {
    setSimulators((prev) => {
      const next = updater(prev)
      writeStore(next)
      return next
    })
  }, [])

  const addSimulator = useCallback(
    (data: NewSimulator) => {
      const simulator: Simulator = {
        ...data,
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        is_favorite: false,
        created_at: new Date().toISOString(),
      }
      persist((prev) => [simulator, ...prev])
    },
    [persist],
  )

  const toggleFavorite = useCallback(
    (id: string) => {
      persist((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_favorite: !s.is_favorite } : s)),
      )
    },
    [persist],
  )

  const removeSimulator = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((s) => s.id !== id))
    },
    [persist],
  )

  return { simulators, loaded, addSimulator, toggleFavorite, removeSimulator }
}
