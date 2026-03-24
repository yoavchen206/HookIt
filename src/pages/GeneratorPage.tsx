import AppLayout from '@/components/layout/AppLayout'
import InputForm from '@/components/generator/InputForm'
import HookResults from '@/components/generator/HookResults'
import EmptyState from '@/components/generator/EmptyState'
import GenerationError from '@/components/generator/GenerationError'
import { useApp } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'
import { RotateCcw, Sparkles } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function GeneratorPage() {
  const { status, clearHooks, hooks, progress } = useApp()
  const hasDone = status === 'done' && hooks.length > 0
  const isGenerating = status === 'generating'

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-10 lg:items-start">
          {/* Left panel — Input form */}
          <aside className="lg:sticky lg:top-[4.5rem] space-y-5">
            {/* Page header */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Hook Generator
                </h1>
                {hasDone && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHooks}
                    className="text-xs text-muted-foreground gap-1.5 h-7"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter your product details to generate 50 psychology-based ad hooks instantly.
              </p>
            </div>

            <Separator />

            {/* Input form */}
            <InputForm />

            {/* Pro tip */}
            <div
              className={cn(
                'rounded-xl border border-border/50 bg-secondary/30 p-4 space-y-1.5 transition-opacity',
                isGenerating && 'opacity-50 pointer-events-none'
              )}
            >
              <p className="text-xs font-semibold text-foreground">💡 Better inputs = better hooks</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Be specific about your audience and benefit. "Busy moms who want to lose 15 lbs
                without giving up wine" beats "people who want to lose weight."
              </p>
            </div>

            {/* Progress indicator for mobile */}
            {isGenerating && (
              <div className="lg:hidden animate-fade-in">
                <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5">
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Generating hooks…</p>
                    <p className="text-xs text-muted-foreground">{progress}% complete</p>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Right panel — Results */}
          <section className="min-h-[400px]">
            {status === 'error' ? (
              <GenerationError />
            ) : status === 'idle' ||
              (status === 'limit-reached' && hooks.length === 0) ? (
              <EmptyState />
            ) : (
              <HookResults />
            )}
          </section>
        </div>
      </div>
    </AppLayout>
  )
}
