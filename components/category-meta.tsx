import { Atom, Beaker, Leaf, type LucideIcon } from 'lucide-react'
import type { Category, Difficulty } from '@/lib/simulators'

type CategoryMeta = {
  icon: LucideIcon
  topBorder: string
  badge: string
  iconBg: string
  iconText: string
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  Química: {
    icon: Beaker,
    topBorder: 'border-t-quimica',
    badge: 'bg-quimica-soft text-quimica',
    iconBg: 'bg-quimica-soft',
    iconText: 'text-quimica',
  },
  Física: {
    icon: Atom,
    topBorder: 'border-t-fisica',
    badge: 'bg-fisica-soft text-fisica',
    iconBg: 'bg-fisica-soft',
    iconText: 'text-fisica',
  },
  Biología: {
    icon: Leaf,
    topBorder: 'border-t-biologia',
    badge: 'bg-biologia-soft text-biologia',
    iconBg: 'bg-biologia-soft',
    iconText: 'text-biologia',
  },
}

export const difficultyBadge: Record<Difficulty, string> = {
  Básico: 'bg-primary/10 text-primary',
  Intermedio: 'bg-slate-200 text-slate-700',
  Avanzado: 'bg-slate-800 text-white',
}
