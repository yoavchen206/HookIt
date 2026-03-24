import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  type GeneratedHook,
  type GenerationInput,
  type HookAngle,
  generateHooks,
  regenerateAngleHooks,
  groupHooksByAngle,
  HOOK_ANGLES,
} from '@/lib/hooks-engine'
import {
  canGenerate,
  incrementUsage,
  getRemainingGenerations,
  isProUser,
  getDailyLimit,
} from '@/lib/storage'

export type GenerationStatus = 'idle' | 'generating' | 'done' | 'error' | 'limit-reached'

const HISTORY_KEY = 'hookit_history'

export interface HistoryEntry {
  id: string
  timestamp: number
  input: {
    productName: string
    targetAudience: string
    keyBenefit: string
  }
  hookCount: number
  isDemo?: boolean
}

function saveToHistory(input: GenerationInput, hookCount: number) {
  try {
    const rawHistory = localStorage.getItem(HISTORY_KEY)
    const history: HistoryEntry[] = rawHistory ? (JSON.parse(rawHistory) as HistoryEntry[]) : []
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      input: {
        productName: input.productName,
        targetAudience: input.targetAudience,
        keyBenefit: input.keyBenefit,
      },
      hookCount,
    }
    const updated = [entry, ...history].slice(0, 50)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {
    // ignore
  }
}

const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: 'demo-1',
    timestamp: Date.now() - 1000 * 60 * 47, // 47 min ago
    input: {
      productName: 'Supergut',
      targetAudience: 'busy professionals over 35',
      keyBenefit: 'lose belly fat in 30 days without dieting',
    },
    hookCount: 50,
    isDemo: true,
  },
  {
    id: 'demo-2',
    timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
    input: {
      productName: 'Notion AI',
      targetAudience: 'startup founders and solopreneurs',
      keyBenefit: '10x your content output without hiring a writer',
    },
    hookCount: 50,
    isDemo: true,
  },
  {
    id: 'demo-3',
    timestamp: Date.now() - 1000 * 60 * 60 * 27, // yesterday
    input: {
      productName: 'Athletic Greens (AG1)',
      targetAudience: 'fitness enthusiasts who skip breakfast',
      keyBenefit: 'daily energy without the caffeine crash',
    },
    hookCount: 50,
    isDemo: true,
  },
  {
    id: 'demo-4',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    input: {
      productName: 'Headspace',
      targetAudience: 'burnt-out remote workers',
      keyBenefit: 'sleep better in 7 days or your money back',
    },
    hookCount: 50,
    isDemo: true,
  },
  {
    id: 'demo-5',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
    input: {
      productName: 'Whoop 4.0',
      targetAudience: 'competitive athletes and gym obsessives',
      keyBenefit: 'recover faster and train harder with real biometric data',
    },
    hookCount: 50,
    isDemo: true,
  },
]

interface AppContextValue {
  // Input state
  input: GenerationInput
  setInput: (input: GenerationInput) => void

  // Generation state
  hooks: GeneratedHook[]
  groupedHooks: Record<HookAngle, GeneratedHook[]>
  status: GenerationStatus
  progress: number
  errorMessage: string

  // Actions
  generate: () => Promise<void>
  regenerateAngle: (angle: HookAngle) => void
  clearHooks: () => void

  // Copy state
  copiedId: string | null
  copyHook: (hook: GeneratedHook) => void
  copyAllHooks: () => void
  copyAngleHooks: (angle: HookAngle) => void

  // Usage
  remaining: number
  dailyLimit: number
  isPro: boolean

  // UI state
  activeAngle: HookAngle | 'all'
  setActiveAngle: (angle: HookAngle | 'all') => void
  selectedHooks: Set<string>
  toggleHookSelection: (id: string) => void
  clearSelection: () => void
  copySelectedHooks: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const INITIAL_INPUT: GenerationInput = {
  productName: 'Supergut',
  productDescription: 'A daily prebiotic fiber supplement that feeds good gut bacteria, reduces bloating, and supports healthy weight management — all in one morning scoop.',
  targetAudience: 'busy professionals over 35',
  keyBenefit: 'lose belly fat in 30 days without dieting',
  tone: 'direct',
}

function buildEmptyGrouped(): Record<HookAngle, GeneratedHook[]> {
  const empty = {} as Record<HookAngle, GeneratedHook[]>
  for (const a of HOOK_ANGLES) empty[a.id] = []
  return empty
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState<GenerationInput>(INITIAL_INPUT)
  const [hooks, setHooks] = useState<GeneratedHook[]>([])
  const [groupedHooks, setGroupedHooks] = useState<Record<HookAngle, GeneratedHook[]>>(buildEmptyGrouped)
  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [remaining, setRemaining] = useState(getRemainingGenerations())
  const [isPro] = useState(isProUser())
  const [activeAngle, setActiveAngle] = useState<HookAngle | 'all'>('all')
  const [selectedHooks, setSelectedHooks] = useState<Set<string>>(new Set())
  const [hasAutoGenerated, setHasAutoGenerated] = useState(false)

  const dailyLimit = getDailyLimit()

  useEffect(() => {
    setRemaining(getRemainingGenerations())
  }, [])

  const generate = useCallback(async () => {
    if (!canGenerate()) {
      setStatus('limit-reached')
      return
    }

    setStatus('generating')
    setProgress(0)
    setSelectedHooks(new Set())
    setErrorMessage('')

    const progressSteps = [8, 20, 35, 52, 67, 80, 92]
    for (const step of progressSteps) {
      await new Promise<void>((r) => setTimeout(r, 75 + Math.random() * 55))
      setProgress(step)
    }

    try {
      const generated = generateHooks(input)
      await new Promise<void>((r) => setTimeout(r, 80))
      setProgress(100)
      await new Promise<void>((r) => setTimeout(r, 120))

      setHooks(generated)
      setGroupedHooks(groupHooksByAngle(generated))
      setActiveAngle('all')
      setStatus('done')
      incrementUsage()
      setRemaining(getRemainingGenerations())
      saveToHistory(input, generated.length)
    } catch (err) {
      setStatus('error')
      setErrorMessage('Failed to generate hooks. Please try again.')
    }
  }, [input])

  // Auto-generate on first mount with the pre-filled demo input
  useEffect(() => {
    if (!hasAutoGenerated) {
      setHasAutoGenerated(true)
      generate()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const regenerateAngle = useCallback(
    (angle: HookAngle) => {
      const angleConfig = HOOK_ANGLES.find((a) => a.id === angle)
      if (!angleConfig) return
      const newHooks = regenerateAngleHooks(input, angle, angleConfig.count)
      setHooks((prev) => {
        const filtered = prev.filter((h) => h.angle !== angle)
        return [...filtered, ...newHooks]
      })
      setGroupedHooks((prev) => ({
        ...prev,
        [angle]: newHooks,
      }))
    },
    [input]
  )

  const clearHooks = useCallback(() => {
    setHooks([])
    setGroupedHooks(buildEmptyGrouped())
    setStatus('idle')
    setProgress(0)
    setSelectedHooks(new Set())
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      })
    } else {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }, [])

  const copyHook = useCallback(
    (hook: GeneratedHook) => {
      copyToClipboard(hook.text)
      setCopiedId(hook.id)
      setTimeout(() => setCopiedId(null), 1800)
    },
    [copyToClipboard]
  )

  const copyAllHooks = useCallback(() => {
    const text = HOOK_ANGLES.flatMap((angle) => {
      const angleHooks = groupedHooks[angle.id] ?? []
      if (angleHooks.length === 0) return []
      return [`\n== ${angle.label} ==`, ...angleHooks.map((h) => h.text)]
    })
      .join('\n')
      .trim()
    copyToClipboard(text)
    setCopiedId('__all__')
    setTimeout(() => setCopiedId(null), 1800)
  }, [groupedHooks, copyToClipboard])

  const copyAngleHooks = useCallback(
    (angle: HookAngle) => {
      const angleHooks = groupedHooks[angle] ?? []
      const text = angleHooks.map((h) => h.text).join('\n')
      copyToClipboard(text)
      setCopiedId(`__angle__${angle}`)
      setTimeout(() => setCopiedId(null), 1800)
    },
    [groupedHooks, copyToClipboard]
  )

  const toggleHookSelection = useCallback((id: string) => {
    setSelectedHooks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedHooks(new Set())
  }, [])

  const copySelectedHooks = useCallback(() => {
    const selected = hooks.filter((h) => selectedHooks.has(h.id))
    const text = selected.map((h) => h.text).join('\n')
    copyToClipboard(text)
    setCopiedId('__selected__')
    setTimeout(() => setCopiedId(null), 1800)
  }, [hooks, selectedHooks, copyToClipboard])

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        hooks,
        groupedHooks,
        status,
        progress,
        errorMessage,
        generate,
        regenerateAngle,
        clearHooks,
        copiedId,
        copyHook,
        copyAllHooks,
        copyAngleHooks,
        remaining,
        dailyLimit,
        isPro,
        activeAngle,
        setActiveAngle,
        selectedHooks,
        toggleHookSelection,
        clearSelection,
        copySelectedHooks,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export { MOCK_HISTORY, HISTORY_KEY }
