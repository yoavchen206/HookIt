import { Sparkles, Zap, Target, RefreshCw } from 'lucide-react'
import { HOOK_ANGLES } from '@/lib/hooks-engine'

const features = [
  {
    icon: Zap,
    title: '50 hooks in seconds',
    description: 'Not one idea — fifty. Organized across 10 psychology-based angles.',
  },
  {
    icon: Target,
    title: '10 proven angles',
    description: 'Curiosity, fear, authority, social proof, contrast & more.',
  },
  {
    icon: RefreshCw,
    title: 'Instant regeneration',
    description: 'Refresh any angle to get fresh variations without starting over.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Ryan Callahan',
    handle: '@ryancallahan_dtc',
    avatar: 'RC',
    avatarColor: 'bg-emerald-500/20 text-emerald-400',
    text: 'Used HookIt to test 12 angles for a skincare brand in one afternoon. Two of the curiosity hooks became our top-performing Meta ads that week. Insane ROI.',
    role: 'Media Buyer @ Proxima Growth',
  },
  {
    name: 'Priya Menon',
    handle: '@priyam_ecom',
    avatar: 'PM',
    avatarColor: 'bg-teal-500/20 text-teal-400',
    text: 'I used to spend 2 hours writing hooks before every launch. Now I generate 50 in 10 seconds and just pick my favorites. This tool pays for itself in time saved alone.',
    role: 'Founder, Menon Commerce',
  },
  {
    name: 'Jake Dorroh',
    handle: '@jakedorroh',
    avatar: 'JD',
    avatarColor: 'bg-green-500/20 text-green-400',
    text: 'The "contrast" and "specificity" angles alone are worth it. My CTR jumped 34% after switching to hooks from HookIt. I now run it for every single client.',
    role: 'Performance Creative Director',
  },
  {
    name: 'Sofia Leandro',
    handle: '@sofialeo_ads',
    avatar: 'SL',
    avatarColor: 'bg-lime-500/20 text-lime-400',
    text: 'Finally a tool that thinks like a direct response copywriter. The fear + authority combo hooks are scary good. My clients think I have a secret copywriter on retainer.',
    role: 'DTC Ads Consultant',
  },
]

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-8">
      {/* Hero */}
      <div className="space-y-3 max-w-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 mx-auto">
          <Sparkles className="w-5 h-5 text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Your hooks will appear here
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Fill in your product details and hit{' '}
          <span className="text-foreground font-medium">Generate 50 Hooks</span>. We'll create
          structured, testable hooks across every major psychological angle.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50 text-center"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Angle pills preview */}
      <div className="w-full max-w-xl">
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
          Hook angles you'll get
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {HOOK_ANGLES.map((angle) => (
            <div
              key={angle.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${angle.bgColor} ${angle.color} ${angle.borderColor}`}
            >
              <span>{angle.emoji}</span>
              {angle.label}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-xl space-y-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          What marketers are saying
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.handle}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 text-left"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 text-amber-400 fill-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-1 border-t border-border/60">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${t.avatarColor}`}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-none truncate">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
