'use client'

import { useEffect, useId, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CATEGORIES,
  DIFFICULTIES,
  type Category,
  type Difficulty,
  type NewSimulator,
} from '@/lib/simulators'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (data: NewSimulator) => void
}

const fieldClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

export function AddSimulatorDialog({ open, onClose, onCreate }: Props) {
  const ids = useId()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('Química')
  const [difficulty, setDifficulty] = useState<Difficulty>('Básico')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setTitle('')
      setCategory('Química')
      setDifficulty('Básico')
      setUrl('')
      setDescription('')
    }
  }, [open])

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return
    onCreate({
      title: title.trim(),
      category,
      difficulty,
      url: url.trim(),
      description: description.trim(),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${ids}-title`}
    >
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2
              id={`${ids}-title`}
              className="text-lg font-semibold text-card-foreground"
            >
              Agregar Simulador
            </h2>
            <p className="text-sm text-muted-foreground">
              Registra un nuevo simulador para el laboratorio.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${ids}-name`} className="text-sm font-medium text-foreground">
              Nombre del simulador
            </label>
            <input
              id={`${ids}-name`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Ej. Tabla periódica interactiva"
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${ids}-cat`} className="text-sm font-medium text-foreground">
                Materia
              </label>
              <select
                id={`${ids}-cat`}
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={fieldClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${ids}-dif`} className="text-sm font-medium text-foreground">
                Dificultad
              </label>
              <select
                id={`${ids}-dif`}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className={fieldClass}
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${ids}-url`} className="text-sm font-medium text-foreground">
              URL del simulador
            </label>
            <input
              id={`${ids}-url`}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://..."
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${ids}-desc`} className="text-sm font-medium text-foreground">
              Descripción
            </label>
            <textarea
              id={`${ids}-desc`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Breve descripción del tema y objetivos."
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div className="mt-1 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Guardar Simulador
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
