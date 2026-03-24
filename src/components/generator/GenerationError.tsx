import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'

export default function GenerationError() {
  const { status, errorMessage, generate } = useApp()

  if (status !== 'error') return null

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-destructive" />
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">Generation failed</p>
        <p className="text-xs text-muted-foreground max-w-xs">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={generate} className="gap-2">
        <RefreshCw className="w-3.5 h-3.5" />
        Try again
      </Button>
    </div>
  )
}
