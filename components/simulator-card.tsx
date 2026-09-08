'use client'

import { ExternalLink, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categoryMeta, difficultyBadge } from '@/components/category-meta'
import type { Simulator } from '@/lib/simulators'
import { cn } from '@/lib/utils'

type Props = {
  simulator: Simulator
  onToggleFavorite: (id: string) => void
  onRemove: (id: string) => void
}

export function SimulatorCard({ simulator, onToggleFavorite, onRemove }: Props) {
  const meta = categoryMeta[simulator.category]
  const Icon = meta.icon

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border border-t-4 bg-card p-5 shadow-sm transition-shadow hover:shadow-md',
        meta.topBorder,
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-11 items-center justify-center rounded-lg',
              meta.iconBg,
              meta.iconText,
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-pretty text-base font-semibold leading-snug text-card-foreground">
            {simulator.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavorite(simulator.id)}
          aria-pressed={simulator.is_favorite}
          aria-label={
            simulator.is_favorite ? 'Quitar de favoritos' : 'Marcar como favorito'
          }
          className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-biologia"
        >
          <Star
            className={cn(
              'size-5',
              simulator.is_favorite && 'fill-biologia text-biologia',
            )}
            aria-hidden="true"
          />
        </button>
      </header>

      <div className="flex flex-wrap gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            meta.badge,
          )}
        >
          {simulator.category}
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            difficultyBadge[simulator.difficulty],
          )}
        >
          {simulator.difficulty}
        </span>
      </div>

      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {simulator.description || 'Sin descripción.'}
      </p>

      <footer className="mt-auto flex items-center gap-2 pt-1">
        <Button
          render={
            <a href={simulator.url} target="_blank" rel="noopener noreferrer" />
          }
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Abrir Simulador
          <ExternalLink className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onRemove(simulator.id)}
          aria-label={`Eliminar ${simulator.title}`}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </footer>
    </article>
  )
}
