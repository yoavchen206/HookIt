const DAILY_LIMIT = 20
const STORAGE_KEY = 'hookit_usage'
const PRO_KEY = 'hookit_pro'

interface UsageData {
  date: string
  count: number
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

export function getUsageData(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { date: getTodayString(), count: 0 }
    const data = JSON.parse(raw) as UsageData
    if (data.date !== getTodayString()) {
      return { date: getTodayString(), count: 0 }
    }
    return data
  } catch {
    return { date: getTodayString(), count: 0 }
  }
}

export function incrementUsage(): void {
  const data = getUsageData()
  const updated: UsageData = {
    date: getTodayString(),
    count: data.count + 1,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getRemainingGenerations(): number {
  if (isProUser()) return Infinity
  const data = getUsageData()
  return Math.max(0, DAILY_LIMIT - data.count)
}

export function canGenerate(): boolean {
  if (isProUser()) return true
  return getRemainingGenerations() > 0
}

export function getDailyLimit(): number {
  return DAILY_LIMIT
}

export function isProUser(): boolean {
  try {
    return localStorage.getItem(PRO_KEY) === 'true'
  } catch {
    return false
  }
}

export function setProUser(value: boolean): void {
  try {
    localStorage.setItem(PRO_KEY, String(value))
  } catch {
    // ignore
  }
}
