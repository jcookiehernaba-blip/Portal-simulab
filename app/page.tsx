'use client'

import { useMemo, useState } from 'react'
import { FlaskConical, Plus, Search, TestTubes } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddSimulatorDialog } from '@/components/add-simulator-dialog'
import { SimulatorCard } from '@/components/simulator-card'
import {
  CATEGORIES,
  DIFFICULTIES,
  useSimulators,
  type Category,
  type Difficulty,
} from '@/lib/simulators'
import { cn } from '@/lib/utils'

type MateriaFilter = 'Todas' | Category
type DificultadFilter = 'Todos' | Difficulty

export default function Page() {
  const { simulators, loaded, addSimulator, toggleFavorite, removeSimulator } =
    useSimulators()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [materia, setMateria] = useState<MateriaFilter>('Todas')
  const [dificultad, setDificultad] = useState<DificultadFilter>('Todos')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return simulators.filter((s) => {
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      const matchesMateria = materia === 'Todas' || s.category === materia
      const matchesDificultad = dificultad === 'Todos' || s.difficulty === dificultad
      return matchesQuery && matchesMateria && matchesDificultad
    })
  }, [simulators, query, materia, dificultad])

  const materiaOptions: MateriaFilter[] = ['Todas', ...CATEGORIES]
  const dificultadOptions: DificultadFilter[] = ['Todos', ...DIFFICULTIES]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-sena text-sena-foreground">
              <FlaskConical className="size-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-lg font-bold text-card-foreground">SimuLab</p>
              <p className="text-xs text-muted-foreground">
                Portal de Simuladores Virtuales
              </p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            size="lg"
            className="bg-sena text-sena-foreground hover:bg-sena/90"
          >
            <Plus className="size-4" aria-hidden="true" />
            Agregar Simulador
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-8 flex flex-col gap-4">
          <span className="w-fit rounded-full bg-sena/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sena">
            Formación Virtual
          </span>
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Laboratorios de Práctica
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Explora los simuladores, nivel de dificultad y aprende más sobre los temas.
          </p>

          <div className="relative mt-2 max-w-xl">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Buscar simuladores por nombre o tema..."
              aria-label="Buscar simuladores"
              className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            />
          </div>
        </section>

        <div className="mb-8 flex flex-col gap-4">
          <FilterGroup
            label="Materia"
            options={materiaOptions}
            active={materia}
            onChange={setMateria}
          />
          <FilterGroup
            label="Dificultad"
            options={dificultadOptions}
            active={dificultad}
            onChange={setDificultad}
          />
        </div>

        {!loaded ? null : simulators.length === 0 ? (
          <EmptyState onAdd={() => setDialogOpen(true)} />
        ) : filtered.length === 0 ? (
          <NoResults />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SimulatorCard
                key={s.id}
                simulator={s}
                onToggleFavorite={toggleFavorite}
                onRemove={removeSimulator}
              />
            ))}
          </div>
        )}
      </main>

      <AddSimulatorDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={addSimulator}
      />
    </div>
  )
}

function FilterGroup<T extends string>({
  label,
  options,
  active,
  onChange,
}: {
  label: string
  options: T[]
  active: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted-foreground">{label}:</span>
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-sena bg-sena text-sena-foreground'
                : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-sena/10 text-sena">
        <TestTubes className="size-7" aria-hidden="true" />
      </span>
      <div className="max-w-sm">
        <h2 className="text-lg font-semibold text-card-foreground">
          Aún no hay simuladores
        </h2>
        <p className="mt-1 text-pretty text-sm text-muted-foreground">
          Comienza agregando tu primer simulador de Física, Química o Biología para
          organizar tus prácticas de laboratorio.
        </p>
      </div>
      <Button
        onClick={onAdd}
        className="bg-sena text-sena-foreground hover:bg-sena/90"
      >
        <Plus className="size-4" aria-hidden="true" />
        Agregar Simulador
      </Button>
    </div>
  )
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-card-foreground">Sin resultados</h2>
      <p className="text-pretty text-sm text-muted-foreground">
        No se encontraron simuladores con los filtros aplicados.
      </p>
    </div>
  )
}
