export type HookAngle =
  | 'curiosity'
  | 'mistake'
  | 'authority'
  | 'social-proof'
  | 'urgency'
  | 'contrast'
  | 'fear'
  | 'aspiration'
  | 'specificity'
  | 'story'

export interface HookAngleConfig {
  id: HookAngle
  label: string
  description: string
  color: string
  bgColor: string
  borderColor: string
  emoji: string
  count: number
}

export const HOOK_ANGLES: HookAngleConfig[] = [
  {
    id: 'curiosity',
    label: 'Curiosity',
    description: 'Open loops that compel clicks',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    emoji: '🔍',
    count: 5,
  },
  {
    id: 'mistake',
    label: 'Mistake',
    description: 'Common errors your audience makes',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    emoji: '⚠️',
    count: 5,
  },
  {
    id: 'authority',
    label: 'Authority',
    description: 'Expert positioning & credibility',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    emoji: '🏆',
    count: 5,
  },
  {
    id: 'social-proof',
    label: 'Social Proof',
    description: 'Numbers, testimonials & momentum',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    emoji: '👥',
    count: 5,
  },
  {
    id: 'urgency',
    label: 'Urgency',
    description: 'Time pressure & scarcity signals',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    emoji: '⚡',
    count: 5,
  },
  {
    id: 'contrast',
    label: 'Contrast',
    description: 'Before/after & comparison frames',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    emoji: '⚖️',
    count: 5,
  },
  {
    id: 'fear',
    label: 'Fear',
    description: 'Loss aversion & risk awareness',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    emoji: '😨',
    count: 5,
  },
  {
    id: 'aspiration',
    label: 'Aspiration',
    description: 'Dream outcomes & identity shifts',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    emoji: '✨',
    count: 5,
  },
  {
    id: 'specificity',
    label: 'Specificity',
    description: 'Precise numbers & concrete claims',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    emoji: '🎯',
    count: 5,
  },
  {
    id: 'story',
    label: 'Story',
    description: 'Narrative arcs that draw people in',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
    emoji: '📖',
    count: 5,
  },
]

export interface GeneratedHook {
  id: string
  text: string
  angle: HookAngle
  angleConfig: HookAngleConfig
}

export interface GenerationInput {
  productName: string
  productDescription: string
  targetAudience: string
  keyBenefit: string
  tone?: string
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function getTemplates(
  angle: HookAngle,
  prod: string,
  audience: string,
  benefit: string,
  desc: string
): string[] {
  const templateMap: Record<HookAngle, string[]> = {
    curiosity: [
      `Why are ${audience} quietly switching to ${prod}?`,
      `The weird thing that happened when we showed ${audience} ${prod}…`,
      `Nobody talks about this part of ${benefit}. Until now.`,
      `What if everything you knew about ${desc} was completely backwards?`,
      `We weren't going to share this. But too many ${audience} kept asking.`,
      `The ${prod} secret that top performers never post about.`,
      `Something unexpected happens after ${audience} use ${prod} for 7 days.`,
      `The question ${audience} are Googling at 2am — finally answered.`,
      `Here's what ${prod} does that nobody mentions in the reviews.`,
      `What the best ${audience} know about ${benefit} that most don't.`,
      `The ${prod} detail that changes everything once you see it.`,
      `We kept this feature quiet for months. ${audience} found it anyway.`,
    ],
    mistake: [
      `Stop doing this if you actually want to ${benefit}.`,
      `The #1 mistake ${audience} make that silently kills their results.`,
      `You're approaching ${desc} wrong. Here's what actually works.`,
      `Not seeing results? You're probably making this one mistake.`,
      `The ${desc} mistake costing ${audience} serious time and money.`,
      `Most ${audience} get this completely backwards. No wonder nothing sticks.`,
      `We fixed the mistake 90% of ${audience} don't even know they're making.`,
      `Trying to ${benefit} without ${prod}? That's where it's going wrong.`,
      `The conventional wisdom about ${benefit} is flat-out wrong.`,
      `Everyone tells ${audience} to do this. It's actually making things worse.`,
      `The mistake I made for years before discovering ${prod}.`,
      `${audience} who struggle to ${benefit} all share this one flaw.`,
    ],
    authority: [
      `After helping 10,000+ ${audience} — here's what we know works.`,
      `The method trusted by the top 1% of ${audience} worldwide.`,
      `Industry experts agree: ${prod} changes how you ${benefit}.`,
      `Built by ${audience} who were tired of settling for mediocre solutions.`,
      `The same system used by the highest-performing ${audience} in the world.`,
      `We spent 3 years refining this so you don't have to start from scratch.`,
      `Backed by research. Proven by ${audience}. Delivered by ${prod}.`,
      `When serious ${audience} needed to ${benefit}, they chose this.`,
      `The ${prod} framework has been validated across 1,000+ real use cases.`,
      `What the research actually says about ${benefit} — built into ${prod}.`,
      `Leading ${audience} helped us build ${prod} from the ground up.`,
      `The gold-standard approach to ${benefit}, packaged into ${prod}.`,
    ],
    'social-proof': [
      `Over 50,000 ${audience} already made the switch to ${prod}.`,
      `"I can't believe I waited this long." — actual ${audience} review.`,
      `Join the ${audience} who finally cracked how to ${benefit}.`,
      `${prod} just crossed 10,000 five-star reviews. Here's why.`,
      `Trending inside every serious ${audience} community right now.`,
      `Everyone in the ${audience} world is talking about ${prod}.`,
      `From 0 to 50K users in 6 months — ${audience} don't lie.`,
      `The most shared tool among high-performance ${audience} this quarter.`,
      `${audience} are recommending ${prod} to everyone they know.`,
      `This ${audience} community went from skeptical to obsessed with ${prod}.`,
      `See why ${audience} keep coming back to ${prod} month after month.`,
      `${audience} call this the best thing they've added to their workflow.`,
    ],
    urgency: [
      `This pricing won't last. Here's your window to lock it in.`,
      `${audience} who started earlier are already seeing 3x better results.`,
      `We're limiting access to ${prod} this week — here's why.`,
      `The ${audience} who started last month already see the results. Do you?`,
      `Every day you delay is another day without the results you want.`,
      `Last chance to ${benefit} before this becomes the new standard.`,
      `We're raising prices in 48 hours. Get your rate now.`,
      `The window to ${benefit} at this level closes sooner than you think.`,
      `${audience} who moved fast on ${prod} are now the ones others envy.`,
      `Don't be the ${audience} who waits 6 months and regrets it.`,
      `Spots are filling — not because of artificial scarcity, because ${prod} works.`,
      `This offer for ${audience} disappears when the counter hits zero.`,
    ],
    contrast: [
      `Old way: grind for months and hope. New way: ${prod}.`,
      `Before ${prod}: frustrated ${audience}. After: unstoppable momentum.`,
      `What if you could ${benefit} in days instead of months?`,
      `Other tools patch the problem. ${prod} removes it entirely.`,
      `They kept doing it the hard way. We built a smarter path.`,
      `Generic solutions get average results. ${prod} was built differently.`,
      `${audience} who switched from the old approach to ${prod} saw this:`,
      `There's the slow, painful way. Then there's ${prod}.`,
      `Before ${prod}: hours of effort. After: minutes. Same results.`,
      `The difference between ${audience} who ${benefit} and those who don't? ${prod}.`,
      `Why settle for incremental progress when ${prod} delivers real transformation?`,
      `Six months ago vs. now — this is what ${prod} actually does for ${audience}.`,
    ],
    fear: [
      `What if you're already falling behind on this without knowing it?`,
      `${audience} who ignore this are leaving massive results on the table.`,
      `The hidden cost of not having a system to reliably ${benefit}.`,
      `Every day without ${prod} is a day your competition gains ground.`,
      `What happens to ${audience} who don't adapt to this shift? This.`,
      `You already know the risk of doing nothing. ${prod} eliminates it.`,
      `Don't let another quarter pass without figuring out how to ${benefit}.`,
      `The slow approach still works. But at what cost to your time and growth?`,
      `${audience} are losing to their competition because of this one gap.`,
      `Ignoring ${desc} is a mistake that compounds every single month.`,
      `The threat ${audience} aren't discussing — but absolutely should be.`,
      `By the time most ${audience} realize this, it's already too late.`,
    ],
    aspiration: [
      `Imagine waking up knowing you've already solved how to ${benefit}.`,
      `The version of you who mastered ${benefit} — what does their week look like?`,
      `${audience} who use ${prod} don't just improve. They lead the category.`,
      `This is what it looks like when ${audience} stop settling for less.`,
      `The breakthrough moment for serious ${audience} starts here.`,
      `You didn't become a driven ${audience} to stay in the middle of the pack.`,
      `What if ${benefit} was only the starting point of what becomes possible?`,
      `Build the results you actually envisioned — not the ones you settled for.`,
      `The life of a ${audience} who truly cracked ${benefit}: this is it.`,
      `${prod} is for the ${audience} who decided enough was enough.`,
      `This isn't just about ${benefit}. It's about who you become doing it.`,
      `${audience} who use ${prod} don't dream about results — they have them.`,
    ],
    specificity: [
      `${audience} using ${prod} save an average of 6.5 hours every week.`,
      `In a study of 3,200 ${audience}: 83% saw better results within 14 days.`,
      `One shift. Three steps. Measurable results in under 30 days.`,
      `We analyzed 10,000+ data points so you can ${benefit} in less time.`,
      `3 angles. 50 hooks. Zero guesswork. That's ${prod}.`,
      `The specific framework behind how top ${audience} consistently ${benefit}.`,
      `${audience} report a 40% improvement in their first 30 days with ${prod}.`,
      `4 inputs. 50 outputs. Under 10 seconds. Welcome to ${prod}.`,
      `${prod} users reach results in an average of 11 days.`,
      `Only 12% of ${audience} know this. The other 88% are still struggling.`,
      `The 5-minute process that top ${audience} use to reliably ${benefit}.`,
      `Cut your time-to-results by 60% using the ${prod} system.`,
    ],
    story: [
      `She tried everything to ${benefit}. Then she found ${prod}. Here's what happened next.`,
      `I was exactly where you are right now. Then one thing changed everything.`,
      `It started as a side project. Now 50,000 ${audience} use it every day.`,
      `Two ${audience} decided to stop complaining and built something better.`,
      `He almost gave up on ever figuring out ${benefit}. Then this.`,
      `We built ${prod} after watching too many ${audience} fail the same avoidable way.`,
      `The day I stopped doing it the hard way was the day everything shifted.`,
      `Nobody believed ${audience} could ${benefit} this quickly. Then ${prod} happened.`,
      `Three years ago I had no idea how to ${benefit}. Here's the turning point.`,
      `They laughed when we said ${audience} would love this. Then the reviews came in.`,
      `This ${audience} went from burned out to thriving in 30 days. Here's the story.`,
      `The idea for ${prod} came from one painful conversation with a struggling ${audience}.`,
    ],
  }

  return templateMap[angle]
}

function generateHookVariations(
  input: GenerationInput,
  angle: HookAngle,
  count: number
): string[] {
  const prod = input.productName.trim() || 'this product'
  const audience = input.targetAudience.trim() || 'people'
  const benefit = input.keyBenefit.trim() || 'transform their results'
  const desc = input.productDescription.trim() || 'this solution'

  const templates = getTemplates(angle, prod, audience, benefit, desc)
  return pickRandom(templates, Math.min(count, templates.length))
}

export function generateHooks(input: GenerationInput): GeneratedHook[] {
  const hooks: GeneratedHook[] = []

  for (const angleConfig of HOOK_ANGLES) {
    const texts = generateHookVariations(input, angleConfig.id, angleConfig.count)
    for (const text of texts) {
      hooks.push({
        id: crypto.randomUUID(),
        text,
        angle: angleConfig.id,
        angleConfig,
      })
    }
  }

  return hooks
}

export function regenerateAngleHooks(
  input: GenerationInput,
  angle: HookAngle,
  count: number
): GeneratedHook[] {
  const angleConfig = HOOK_ANGLES.find((a) => a.id === angle)!
  const texts = generateHookVariations(input, angle, count)
  return texts.map((text) => ({
    id: crypto.randomUUID(),
    text,
    angle,
    angleConfig,
  }))
}

export function groupHooksByAngle(hooks: GeneratedHook[]): Record<HookAngle, GeneratedHook[]> {
  const grouped = {} as Record<HookAngle, GeneratedHook[]>
  for (const angle of HOOK_ANGLES) {
    grouped[angle.id] = hooks.filter((h) => h.angle === angle.id)
  }
  return grouped
}
