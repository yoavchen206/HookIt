import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { isProUser, setProUser } from '@/lib/storage'
import { useState } from 'react'

const FREE_FEATURES = [
  '20 generations per day',
  '50 hooks per generation',
  '10 psychology-based angles',
  'One-click copy per hook',
  'Batch export all hooks',
  'Angle-level regeneration',
]

const PRO_FEATURES = [
  'Unlimited generations',
  '50 hooks per generation',
  '10 psychology-based angles',
  'One-click copy per hook',
  'Batch export all hooks',
  'Angle-level regeneration',
  'Generation history (50 sessions)',
  'Priority processing',
  'Early access to new angles',
]

const FAQS = [
  {
    q: 'How does the free tier work?',
    a: 'You get 20 generations per day for free — no account required. Each generation produces 50 hooks across 10 psychological angles.',
  },
  {
    q: 'What counts as one generation?',
    a: 'Clicking "Generate 50 Hooks" once counts as one generation. Regenerating a single angle does not count toward your limit.',
  },
  {
    q: 'Can I export the hooks?',
    a: 'Yes! You can copy individual hooks, copy all hooks within an angle, or export all 50 hooks at once — on both free and pro plans.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. HookIt works without any sign-up on the free tier. Pro access is managed via a simple activation key.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Marcus Webb',
    role: 'Head of Growth, Feastly',
    avatar: 'MW',
    avatarColor: 'bg-emerald-500/20 text-emerald-400',
    quote: 'We run 8–12 ad concepts per week for each client. HookIt cut our hook-writing time from 3 hours to 15 minutes. The ROI is embarrassingly obvious.',
  },
  {
    name: 'Tanya Osei',
    role: 'DTC Media Buyer',
    avatar: 'TO',
    avatarColor: 'bg-teal-500/20 text-teal-400',
    quote: "The Pro plan pays for itself after one good test. I've had hooks from HookIt become $200K+ winning creatives. $29/mo is basically free at that point.",
  },
  {
    name: 'Ben Hartley',
    role: 'Founder, Compound Creative',
    avatar: 'BH',
    avatarColor: 'bg-green-500/20 text-green-400',
    quote: "I was skeptical of another AI tool. But HookIt actually thinks like a direct response copywriter. My whole agency is on Pro now. We won't go back.",
  },
]

export default function PricingPage() {
  const navigate = useNavigate()
  const [isPro, setIsPro] = useState(isProUser())
  const [activating, setActivating] = useState(false)

  const handleActivatePro = () => {
    setActivating(true)
    setTimeout(() => {
      setProUser(true)
      setIsPro(true)
      setActivating(false)
    }, 800)
  }

  const handleDeactivatePro = () => {
    setProUser(false)
    setIsPro(false)
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <Badge variant="default" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple pricing
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Scale your hook testing
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Start free. Upgrade when you need unlimited volume for your performance marketing workflow.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {/* Free card */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <h2 className="text-base font-semibold">Free</h2>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Perfect for testing HookIt and occasional use.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              Start generating
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>

            <div className="space-y-2.5">
              {FREE_FEATURES.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro card */}
          <div
            className={cn(
              'relative rounded-xl border bg-card p-6 space-y-5',
              'border-green-500/30 shadow-lg shadow-green-500/10',
              'bg-gradient-to-b from-green-500/5 to-transparent'
            )}
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="px-3 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm whitespace-nowrap">
                MOST POPULAR
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-semibold">Pro</h2>
                <Badge variant="default" className="text-[10px] ml-auto">
                  Best value
                </Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground">
                For performance marketers who test at scale.
              </p>
            </div>

            {isPro ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-medium text-emerald-300">Pro plan active</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeactivatePro}
                  className="w-full text-xs text-muted-foreground h-7"
                >
                  Deactivate Pro (demo)
                </Button>
              </div>
            ) : (
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleActivatePro}
                disabled={activating}
              >
                {activating ? (
                  'Activating…'
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            )}

            <div className="space-y-2.5">
              {PRO_FEATURES.map((feature, i) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <Check
                    className={cn(
                      'w-3.5 h-3.5 mt-0.5 shrink-0',
                      i >= FREE_FEATURES.length ? 'text-green-400' : 'text-emerald-400'
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs',
                      i >= FREE_FEATURES.length
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="mb-12 max-w-2xl mx-auto space-y-4">
          <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
            What Pro users say
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0', t.avatarColor)}>
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-none truncate">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage note */}
        <div className="rounded-xl border border-border bg-secondary/30 p-5 mb-12 max-w-2xl mx-auto text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Fair use policy</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pro tier is unlimited under fair use — designed for individual marketers and small teams.
            Automated bulk usage or reselling hook output is not permitted.
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-base font-semibold text-center mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-lg border border-border bg-card p-4 space-y-2"
              >
                <p className="text-sm font-medium text-foreground">{q}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
