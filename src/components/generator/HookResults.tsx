import { useState } from 'react'
import { Copy, Check, Download, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'
import { HOOK_ANGLES, type HookAngle } from '@/lib/hooks-engine'
import HookCard, { HookCardSkeleton, AngleSectionHeader } from './HookCard'
import AngleFilter from './AngleFilter'
import { cn } from '@/lib/utils'

interface AngleSectionProps {
  angleId: HookAngle
}

function AngleSection({ angleId }: AngleSectionProps) {
  const { groupedHooks } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const angleConfig = HOOK_ANGLES.find((a) => a.id === angleId)
  if (!angleConfig) return null

  const angleHooks = groupedHooks[angleConfig.id] ?? []
  if (angleHooks.length === 0) return null

  return (
    <div className="space-y-2">
      {/* Section header row */}
      <div className="flex items-center gap-2">
        <AngleSectionHeader angleConfig={angleConfig} count={angleHooks.length} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Hooks list */}
      {!collapsed && (
        <div className="space-y-1.5 animate-fade-in">
          {angleHooks.map((hook, i) => (
            <HookCard key={hook.id} hook={hook} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function HookResults() {
  const {
    hooks,
    status,
    activeAngle,
    copiedId,
    copyAllHooks,
    selectedHooks,
    clearSelection,
    copySelectedHooks,
  } = useApp()

  const isGenerating = status === 'generating'
  const isDone = status === 'done'

  // Loading skeleton
  if (isGenerating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-44 bg-secondary rounded-full animate-pulse" />
          <div className="h-7 w-24 bg-secondary rounded-lg animate-pulse" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-7 rounded-full bg-secondary animate-pulse"
              style={{ width: `${60 + (i % 3) * 20}px` }}
            />
          ))}
        </div>
        <div className="space-y-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <HookCardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!isDone || hooks.length === 0) {
    return null
  }

  const visibleAngles =
    activeAngle === 'all'
      ? HOOK_ANGLES
      : HOOK_ANGLES.filter((a) => a.id === activeAngle)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {hooks.length} hooks generated
          </span>
          <span className="text-xs text-muted-foreground">
            · {HOOK_ANGLES.length} angles
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Selection actions */}
          {selectedHooks.size > 0 && (
            <div className="flex items-center gap-1.5 animate-fade-in-fast">
              <span className="text-xs text-muted-foreground">
                {selectedHooks.size} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={copySelectedHooks}
                className={cn(
                  'h-7 text-xs gap-1.5 transition-all duration-200',
                  copiedId === '__selected__' &&
                    'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                )}
              >
                {copiedId === '__selected__' ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy selected
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={clearSelection}
                className="h-7 w-7"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}

          {/* Export all */}
          <Button
            variant="outline"
            size="sm"
            onClick={copyAllHooks}
            className={cn(
              'h-7 text-xs gap-1.5 transition-all duration-200',
              copiedId === '__all__' &&
                'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
            )}
          >
            {copiedId === '__all__' ? (
              <>
                <Check className="w-3 h-3" />
                Copied all!
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                Export all
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Angle filter tabs — scrollable on mobile */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <AngleFilter />
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {visibleAngles.map((angleConfig) => (
          <AngleSection key={angleConfig.id} angleId={angleConfig.id} />
        ))}
      </div>

      {/* Bottom strip */}
      <div className="pt-5 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-primary shrink-0" />
          Click any hook to select it, then copy your picks in one click.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAllHooks}
          className="text-xs h-7 gap-1.5 shrink-0"
        >
          <Download className="w-3 h-3" />
          Export all {hooks.length} hooks
        </Button>
      </div>
    </div>
  )
}
