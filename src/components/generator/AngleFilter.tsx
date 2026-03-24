import { cn } from '@/lib/utils'
import { useApp } from '@/contexts/AppContext'
import { HOOK_ANGLES, type HookAngle } from '@/lib/hooks-engine'

export default function AngleFilter() {
  const { activeAngle, setActiveAngle, groupedHooks, hooks } = useApp()

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* All tab */}
      <button
        onClick={() => setActiveAngle('all')}
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150',
          activeAngle === 'all'
            ? 'bg-foreground text-background border-foreground'
            : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-border/80'
        )}
      >
        All <span className="ml-1 opacity-60">{hooks.length}</span>
      </button>

      {HOOK_ANGLES.map((angle) => {
        const count = groupedHooks[angle.id]?.length ?? 0
        const isActive = activeAngle === angle.id

        return (
          <button
            key={angle.id}
            onClick={() => setActiveAngle(angle.id as HookAngle)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150',
              isActive
                ? `${angle.bgColor} ${angle.color} ${angle.borderColor}`
                : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:border-border/80'
            )}
          >
            <span className="mr-1">{angle.emoji}</span>
            {angle.label}
            <span className="ml-1 opacity-60">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
