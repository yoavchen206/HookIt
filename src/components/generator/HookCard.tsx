import React from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type GeneratedHook, type HookAngleConfig, type HookAngle } from '@/lib/hooks-engine'
import { useApp } from '@/contexts/AppContext'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface HookCardProps {
  hook: GeneratedHook
  index: number
}

export default function HookCard({ hook, index }: HookCardProps) {
  const { copiedId, copyHook, selectedHooks, toggleHookSelection } = useApp()
  const isCopied = copiedId === hook.id
  const isSelected = selectedHooks.has(hook.id)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        'group relative flex items-start gap-3 rounded-lg border px-4 py-3.5 cursor-pointer',
        'transition-all duration-150 outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        isSelected
          ? `${hook.angleConfig.bgColor} ${hook.angleConfig.borderColor}`
          : 'bg-card border-border hover:bg-secondary/50 hover:border-border/80'
      )}
      style={{ animationDelay: `${Math.min(index * 20, 300)}ms` }}
      onClick={() => toggleHookSelection(hook.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleHookSelection(hook.id)
        }
      }}
    >
      {/* Checkbox */}
      <div
        className={cn(
          'mt-0.5 w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center transition-all duration-150',
          isSelected
            ? `${hook.angleConfig.color} border-current`
            : 'border-border group-hover:border-muted-foreground/50'
        )}
      >
        {isSelected && (
          <Check
            className={cn('w-2.5 h-2.5', hook.angleConfig.color)}
            strokeWidth={3}
          />
        )}
      </div>

      {/* Hook text */}
      <p
        className={cn(
          'flex-1 text-sm leading-relaxed pt-0.5 transition-colors',
          isSelected ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
        )}
      >
        {hook.text}
      </p>

      {/* Hover actions */}
      <div
        className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 shrink-0 ml-1 mt-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => copyHook(hook)}
              className={cn(
                'p-1.5 rounded-md transition-all duration-150',
                isCopied
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
              aria-label="Copy hook"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>{isCopied ? 'Copied!' : 'Copy hook'}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

// Skeleton loader
interface HookCardSkeletonProps {
  index: number
}

export function HookCardSkeleton({ index }: HookCardSkeletonProps) {
  const widths = ['65%', '80%', '55%', '72%', '90%', '60%', '75%', '85%']
  const width = widths[index % widths.length]

  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="mt-0.5 w-4 h-4 rounded border-2 border-border bg-secondary shrink-0 animate-pulse" />
      <div className="flex-1 space-y-2 pt-0.5">
        <div
          className="h-3.5 bg-secondary rounded-full animate-pulse"
          style={{ width }}
        />
        {index % 4 === 0 && (
          <div
            className="h-3.5 bg-secondary rounded-full animate-pulse"
            style={{ width: `${parseInt(width) * 0.6}%` }}
          />
        )}
      </div>
    </div>
  )
}

// Angle section header with copy + regenerate controls
interface AngleSectionHeaderProps {
  angleConfig: HookAngleConfig
  count: number
}

export function AngleSectionHeader({ angleConfig, count }: AngleSectionHeaderProps) {
  const { regenerateAngle, copiedId, copyAngleHooks } = useApp()
  const isCopied = copiedId === `__angle__${angleConfig.id}`

  const handleCopyAngle = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyAngleHooks(angleConfig.id as HookAngle)
  }

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation()
    regenerateAngle(angleConfig.id as HookAngle)
  }

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base leading-none">{angleConfig.emoji}</span>
        <h3 className={cn('text-sm font-semibold', angleConfig.color)}>
          {angleConfig.label}
        </h3>
        <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5 font-medium">
          {count}
        </span>
        <span className="text-xs text-muted-foreground hidden sm:block truncate">
          — {angleConfig.description}
        </span>
      </div>

      <div className="flex items-center gap-0.5 shrink-0 ml-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopyAngle}
              className={cn(
                'p-1.5 rounded-md transition-all duration-150',
                isCopied
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
              aria-label={`Copy all ${angleConfig.label} hooks`}
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isCopied ? 'Copied!' : `Copy all ${angleConfig.label} hooks`}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleRegenerate}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-150"
              aria-label={`Regenerate ${angleConfig.label} hooks`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Regenerate {angleConfig.label} hooks</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
