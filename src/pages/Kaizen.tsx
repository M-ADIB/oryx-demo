import { Lightbulb, Timer, Banknote, Trophy, Plus } from 'lucide-react'
import { Card, CardHeader, PageHeader, Badge, statusTone } from '../components/ui'
import { KAIZEN, KAIZEN_LEADERS } from '../data/mock'

const cols = ['New', 'Testing', 'Implemented'] as const

export function Kaizen() {
  return (
    <div className="space-y-5">
      <PageHeader title="Kaizen Board" subtitle="改善 — small improvements, every day, from everyone">
        <button className="flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-navy-700">
          <Plus size={15} /> Submit an Idea
        </button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card hover className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-50 text-sage-600"><Timer size={20} /></div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Waste Eliminated This Month</p>
            <p className="text-xl font-bold text-navy-900">142 hours</p>
          </div>
        </Card>
        <Card hover className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600"><Banknote size={20} /></div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Cost Saved This Month</p>
            <p className="text-xl font-bold text-navy-900">AED 96,400</p>
          </div>
        </Card>
        <Card hover className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700"><Lightbulb size={20} /></div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ideas This Quarter</p>
            <p className="text-xl font-bold text-navy-900">38 <span className="text-sm font-semibold text-sage-600">· 17 implemented</span></p>
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-4">
        <div className="grid gap-4 md:grid-cols-3 xl:col-span-3">
          {cols.map(col => (
            <div key={col}>
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[13px] font-bold text-navy-900">{col}</span>
                <Badge tone={statusTone(col)}>{KAIZEN.filter(k => k.status === col).length}</Badge>
              </div>
              <div className="space-y-2.5">
                {KAIZEN.filter(k => k.status === col).map(k => (
                  <Card key={k.id} hover className="p-3.5">
                    <p className="text-[13px] font-medium leading-snug text-navy-900">{k.idea}</p>
                    <div className="mt-2.5 rounded-lg bg-sage-50 px-2.5 py-1.5">
                      <p className="text-[11px] font-semibold text-sage-700">💡 {k.saving}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-50 pt-2">
                      <span className="text-[11px] text-slate-500">{k.by}</span>
                      <Badge tone="navy">{k.dept}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Card className="self-start">
          <CardHeader title="Top Contributors" subtitle="This quarter" action={<Trophy size={16} className="text-gold-500" />} />
          <div className="space-y-1 px-3 pb-4">
            {KAIZEN_LEADERS.map((l, i) => (
              <div key={l.name} className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50">
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${i === 0 ? 'bg-gold-400 text-navy-900' : 'bg-slate-100 text-slate-500'}`}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-navy-900">{l.name}</p>
                  <p className="text-[11px] text-slate-400">{l.dept} · {l.ideas} ideas · {l.implemented} implemented</p>
                </div>
              </div>
            ))}
            <div className="mt-2 rounded-lg bg-navy-50 p-3">
              <p className="text-[12px] leading-snug text-navy-800">
                <strong>Every idea counts.</strong> The foam toolbox insert started as a 2-second improvement — it's now standard across all 18 CIVs.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
