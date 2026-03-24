import React from 'react'
import { Sparkles, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useApp } from '@/contexts/AppContext'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'

const TONE_OPTIONS = [
  { value: 'direct', label: 'Direct' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'bold', label: 'Bold' },
  { value: 'professional', label: 'Professional' },
]

export default function InputForm() {
  const { input, setInput, generate, status, progress, remaining, isPro } = useApp()
  const [showAdvanced, setShowAdvanced] = React.useState(false)
  const isGenerating = status === 'generating'
  const isLimitReached = status === 'limit-reached' || (!isPro && remaining === 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isGenerating && !isLimitReached) {
      generate()
    }
  }

  const isValid = input.productName.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product name — required */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Product / Brand name <span className="text-primary">*</span>
        </label>
        <Input
          placeholder="e.g. Supergut, Notion, Athletic Greens"
          value={input.productName}
          onChange={(e) => setInput({ ...input, productName: e.target.value })}
          className="h-10 text-sm bg-secondary/50 border-border/80 focus-visible:border-primary/60"
          disabled={isGenerating}
          maxLength={80}
          autoFocus
        />
      </div>

      {/* Target audience */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Target audience
        </label>
        <Input
          placeholder="e.g. busy parents, DTC founders, fitness enthusiasts"
          value={input.targetAudience}
          onChange={(e) => setInput({ ...input, targetAudience: e.target.value })}
          className="h-10 text-sm bg-secondary/50 border-border/80 focus-visible:border-primary/60"
          disabled={isGenerating}
          maxLength={100}
        />
      </div>

      {/* Key benefit */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Key benefit / outcome
        </label>
        <Input
          placeholder="e.g. lose 10 lbs in 30 days, 10x content output"
          value={input.keyBenefit}
          onChange={(e) => setInput({ ...input, keyBenefit: e.target.value })}
          className="h-10 text-sm bg-secondary/50 border-border/80 focus-visible:border-primary/60"
          disabled={isGenerating}
          maxLength={120}
        />
      </div>

      {/* Advanced toggle */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        Advanced options
      </button>

      {/* Advanced fields */}
      {showAdvanced && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Product description
            </label>
            <Textarea
              placeholder="Briefly describe what your product does and who it's for…"
              value={input.productDescription}
              onChange={(e) => setInput({ ...input, productDescription: e.target.value })}
              className="text-sm bg-secondary/50 border-border/80 focus-visible:border-primary/60 min-h-[80px]"
              disabled={isGenerating}
              maxLength={300}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((tone) => (
                <button
                  key={tone.value}
                  type="button"
                  onClick={() => setInput({ ...input, tone: tone.value })}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150',
                    input.tone === tone.value
                      ? 'bg-primary/15 border-primary/40 text-primary'
                      : 'bg-secondary/50 border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
                  )}
                  disabled={isGenerating}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {isGenerating && (
        <div className="space-y-1.5 animate-fade-in">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground text-center">
            Generating hooks… {progress}%
          </p>
        </div>
      )}

      {/* Limit reached warning */}
      {isLimitReached && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3.5 py-3 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-amber-300">Daily limit reached</p>
            <p className="text-xs text-amber-400/80">
              You've used all 20 free generations today.{' '}
              <Link to="/pricing" className="underline hover:text-amber-300 transition-colors">
                Upgrade to Pro
              </Link>{' '}
              for unlimited access.
            </p>
          </div>
        </div>
      )}

      {/* CTA button */}
      <Button
        type="submit"
        variant="gradient"
        size="xl"
        className="w-full"
        disabled={isGenerating || !isValid || isLimitReached}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating 50 hooks…
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate 50 Hooks
          </>
        )}
      </Button>

      {!isPro && !isLimitReached && (
        <p className="text-center text-xs text-muted-foreground">
          {remaining} free generation{remaining !== 1 ? 's' : ''} remaining today
        </p>
      )}
    </form>
  )
}
