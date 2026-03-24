import { useApp } from '@/contexts/AppContext'
import { HOOK_ANGLES } from '@/lib/hooks-engine'

export default function StatsBar() {
  const { hooks, groupedHooks, status } = useApp()

  if (status !== 'done' || hooks.length === 0) return null

  return (
    <div className="grid grid-cols-5 gap-2 p-3 rounded-xl border border-border bg-card/50 animate-fade-in">
      {HOOK_ANGLES.slice(0, 5).map((angle) => {
        const count = groupedHooks[angle.id]?.length ?? 0
        return (
          <div key={angle.id} className="flex flex-col items-center gap-1">
            <span className="text-base">{angle.emoji}</span>
            <span className="text-xs font-semibold text-foreground">{count}</span>
            <span className="text-[10px] text-muted-foreground hidden sm:block">{angle.label}</span>
          </div>
        )
      })}
    </div>
  )
}
