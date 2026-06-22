import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react'

export function Card({ children, className, hover }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={clsx(
      'bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(9,40,57,0.06)]',
      hover && 'transition-all duration-200 hover:shadow-[0_4px_16px_rgba(9,40,57,0.10)] hover:-translate-y-px',
      className,
    )}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between px-5 pt-4 pb-2">
      <div>
        <h3 className="text-sm font-semibold text-navy-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

const badgeStyles: Record<string, string> = {
  navy: 'bg-navy-50 text-navy-700 border-navy-100',
  green: 'bg-sage-50 text-sage-700 border-sage-200',
  amber: 'bg-gold-50 text-gold-700 border-gold-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
  blue: 'bg-sky-50 text-sky-700 border-sky-200',
}
export function Badge({ children, tone = 'slate', className }: { children: ReactNode; tone?: keyof typeof badgeStyles; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap', badgeStyles[tone], className)}>
      {children}
    </span>
  )
}

export function StatCard({ label, value, delta, deltaUp, sub, icon }: {
  label: string; value: string; delta?: string; deltaUp?: boolean; sub?: string; icon?: ReactNode
}) {
  return (
    <Card hover className="p-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
        {icon && <span className="text-navy-400">{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-navy-900">{value}</p>
      <div className="mt-1.5 flex items-center gap-2 text-xs">
        {delta && (
          <span className={clsx('inline-flex items-center gap-0.5 font-semibold', deltaUp ? 'text-sage-600' : 'text-red-600')}>
            {deltaUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{delta}
          </span>
        )}
        {sub && <span className="text-slate-400">{sub}</span>}
      </div>
    </Card>
  )
}

export function AIInsight({ children, title = 'Oryx Intelligence', className }: { children: ReactNode; title?: string; className?: string }) {
  return (
    <div className={clsx('rounded-xl border border-gold-200 bg-gradient-to-r from-gold-50 to-white p-4 flex gap-3 animate-fade-up', className)}>
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-gold-300">
        <Sparkles size={16} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-gold-700">{title} · AI Insight</p>
        <p className="mt-0.5 text-sm leading-relaxed text-navy-800">{children}</p>
      </div>
    </div>
  )
}

export function ProgressBar({ value, tone = 'navy' }: { value: number; tone?: 'navy' | 'green' | 'amber' | 'red' }) {
  const colors = { navy: 'bg-navy-700', green: 'bg-sage-500', amber: 'bg-gold-400', red: 'bg-red-500' }
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
      <div className={clsx('h-full rounded-full transition-all duration-500', colors[tone])} style={{ width: `${value}%` }} />
    </div>
  )
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-navy-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function statusTone(s: string): keyof typeof badgeStyles {
  if (['On Track', 'Paid', 'Approved', 'Implemented', 'Resolved', 'Won', 'Hot', 'Lifetime Active', 'Stocked'].includes(s)) return 'green'
  if (['At Risk', 'Pending', 'Sent', 'Testing', 'In Progress', 'Warm', 'Pending Registration', 'Restock Due', 'In Transit', 'Draft'].includes(s)) return 'amber'
  if (['Delayed', 'Overdue', 'Rejected', 'Expired', 'Claim Open'].includes(s)) return 'red'
  if (['New', 'Cold'].includes(s)) return 'slate'
  return 'navy'
}
