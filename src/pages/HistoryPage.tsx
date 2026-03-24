import { useState, useEffect } from 'react'
import { History, Trash2, ArrowRight, Clock, Search, FlaskConical } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/contexts/AppContext'
import { MOCK_HISTORY, HISTORY_KEY, type HistoryEntry } from '@/contexts/AppContext'
import { cn } from '@/lib/utils'

function getRealHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    return JSON.parse(raw) as HistoryEntry[]
  } catch {
    return []
  }
}

function removeFromHistory(id: string, current: HistoryEntry[]): HistoryEntry[] {
  const realEntries = current.filter((e) => !e.isDemo && e.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(realEntries))
  return realEntries
}

function clearAllHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}

function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (seconds < 30) return 'just now'
  if (minutes < 1) return `${seconds}s ago`
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'yesterday'
  return `${days}d ago`
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { setInput } = useApp()

  useEffect(() => {
    const real = getRealHistory()
    // Seed demo data only if there are no real entries yet
    if (real.length === 0) {
      setHistory(MOCK_HISTORY)
    } else {
      setHistory(real)
    }
  }, [])

  const hasOnlyDemo = history.length > 0 && history.every((e) => e.isDemo)

  const filteredHistory = history.filter(
    (e) =>
      !search ||
      e.input.productName.toLowerCase().includes(search.toLowerCase()) ||
      e.input.targetAudience.toLowerCase().includes(search.toLowerCase()) ||
      e.input.keyBenefit.toLowerCase().includes(search.toLowerCase())
  )

  const handleClearAll = () => {
    clearAllHistory()
    setHistory([])
  }

  const handleRemove = (id: string) => {
    if (history.find((e) => e.id === id)?.isDemo) {
      // Just remove from local state for demo entries
      setHistory((prev) => prev.filter((e) => e.id !== id))
    } else {
      const updated = removeFromHistory(id, history)
      const real = getRealHistory()
      setHistory(real.length === 0 ? MOCK_HISTORY : real)
      void updated
    }
  }

  const handleReuse = (entry: HistoryEntry) => {
    setInput({
      productName: entry.input.productName,
      targetAudience: entry.input.targetAudience,
      keyBenefit: entry.input.keyBenefit,
      productDescription: '',
      tone: 'direct',
    })
    navigate('/')
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <History className="w-5 h-5 text-muted-foreground" />
              Generation History
            </h1>
            <p className="text-sm text-muted-foreground">
              {history.length > 0
                ? `${history.length} session${history.length !== 1 ? 's' : ''} saved`
                : 'Your generation sessions will appear here.'}
            </p>
          </div>
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-muted-foreground gap-1.5 h-7 hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </Button>
          )}
        </div>

        {/* Demo data notice */}
        {hasOnlyDemo && (
          <div className="flex items-start gap-2.5 rounded-lg border border-green-500/20 bg-green-500/8 px-3.5 py-3 mb-5 animate-fade-in">
            <FlaskConical className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-green-300">Demo data</p>
              <p className="text-xs text-green-400/80 leading-relaxed">
                These are example sessions so the page doesn't look empty. Your real sessions will appear here after you generate hooks.
              </p>
            </div>
          </div>
        )}

        {/* Search */}
        {history.length > 3 && (
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by product, audience, or benefit…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm bg-secondary/50"
            />
          </div>
        )}

        {/* Empty state — no history */}
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
              <History className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">No history yet</p>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Your generation history will appear here after you create your first set of hooks.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="mt-1 gap-2 text-sm"
            >
              Generate your first hooks
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}

        {/* Empty search results */}
        {history.length > 0 && filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <Search className="w-8 h-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              No sessions match "{search}"
            </p>
            <button
              onClick={() => setSearch('')}
              className="text-xs text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* History list */}
        {filteredHistory.length > 0 && (
          <div className="space-y-2">
            {filteredHistory.map((entry, i) => (
              <div
                key={entry.id}
                className={cn(
                  'group flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl border bg-card px-4 py-3.5',
                  'hover:bg-secondary/40 transition-all duration-150 animate-fade-in',
                  entry.isDemo
                    ? 'border-border/60 opacity-80'
                    : 'border-border hover:border-border/80'
                )}
                style={{ animationDelay: `${Math.min(i * 25, 200)}ms` }}
              >
                {/* Icon */}
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0',
                  entry.isDemo ? 'bg-green-500/10' : 'bg-secondary'
                )}>
                  {entry.isDemo
                    ? <FlaskConical className="w-4 h-4 text-green-400" />
                    : <Clock className="w-4 h-4 text-muted-foreground" />
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {entry.input.productName || 'Unnamed product'}
                    </p>
                    <Badge variant="secondary" className="text-[10px] font-medium shrink-0">
                      {entry.hookCount} hooks
                    </Badge>
                    {entry.isDemo && (
                      <Badge variant="outline" className="text-[10px] font-medium shrink-0 border-green-500/30 text-green-400">
                        demo
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    {entry.input.targetAudience && (
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        👥 {entry.input.targetAudience}
                      </span>
                    )}
                    {entry.input.keyBenefit && (
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        🎯 {entry.input.keyBenefit}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground/60" title={formatDate(entry.timestamp)}>
                    {formatTimeAgo(entry.timestamp)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReuse(entry)}
                    className="text-xs h-7 gap-1.5"
                  >
                    Reuse
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemove(entry.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer hint */}
        {history.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-8">
            History is stored locally in your browser. Up to 50 sessions saved.
          </p>
        )}
      </div>
    </AppLayout>
  )
}
