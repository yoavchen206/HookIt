import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, History, CreditCard, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'
import { Badge } from '@/components/ui/badge'

const navItems = [
  { to: '/', label: 'Generator', icon: Zap },
  { to: '/history', label: 'History', icon: History },
  { to: '/pricing', label: 'Pricing', icon: CreditCard },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { remaining, dailyLimit, isPro } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-semibold text-sm tracking-tight">
                Hook<span className="text-primary">It</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                    location.pathname === to
                      ? 'bg-secondary text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Usage indicator */}
              {!isPro && (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        remaining === 0
                          ? 'bg-destructive'
                          : remaining <= 5
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      )}
                    />
                    <span>
                      {remaining}/{dailyLimit} today
                    </span>
                  </div>
                </div>
              )}

              {isPro ? (
                <Badge variant="default" className="text-[10px] font-semibold tracking-wide uppercase">
                  Pro
                </Badge>
              ) : (
                <Button variant="outline" size="sm" asChild className="hidden sm:flex text-xs h-7">
                  <Link to="/pricing">Upgrade</Link>
                </Button>
              )}

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors',
                    location.pathname === to
                      ? 'bg-secondary text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              {!isPro && (
                <div className="mt-2 pt-2 border-t border-border flex items-center justify-between px-3">
                  <span className="text-xs text-muted-foreground">
                    {remaining}/{dailyLimit} generations remaining today
                  </span>
                  <Button variant="outline" size="sm" asChild className="text-xs h-7">
                    <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                      Upgrade
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
