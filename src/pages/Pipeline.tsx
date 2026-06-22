import { Flag, TrendingUp } from 'lucide-react'
import { Card, PageHeader, AIInsight, Badge } from '../components/ui'
import { DEALS, STAGES, fmtAEDShort, type Stage } from '../data/mock'

const stageAccent: Record<Stage, string> = {
  'Enquiry': 'border-t-slate-300', 'Site Visit': 'border-t-sky-400', 'Quote Sent': 'border-t-gold-400',
  'Negotiation': 'border-t-gold-600', 'Won': 'border-t-sage-500', 'In Production': 'border-t-navy-500', 'Installed': 'border-t-navy-900',
}

const typeColor: Record<string, string> = {
  Villa: 'bg-navy-50 text-navy-700', Apartment: 'bg-sky-50 text-sky-700',
  Commercial: 'bg-slate-100 text-slate-600', 'F&B': 'bg-gold-50 text-gold-700',
}

export function Pipeline() {
  return (
    <div className="space-y-5">
      <PageHeader title="Sales Pipeline — Kanban Board" subtitle="Pull-based flow, Toyota style. Red flags mark deals stuck >14 days.">
        <Card className="flex items-center gap-3 px-4 py-2.5">
          <TrendingUp size={18} className="text-sage-600" />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Forecast</p>
            <p className="text-sm font-bold text-navy-900">AED 3.1M likely to close this month</p>
          </div>
        </Card>
      </PageHeader>

      <AIInsight>
        Quotes above <strong>AED 150K close 40% slower</strong> than smaller deals — the follow-up cadence doesn't adjust for deal size. Countermeasure: tiered follow-up sequence at day 3 / 7 / 14 (drafted on the Kaizen Board, status Testing).
      </AIInsight>

      <div className="-mx-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6">
        <div className="flex min-w-max gap-3">
          {STAGES.map(stage => {
            const deals = DEALS.filter(d => d.stage === stage)
            const total = deals.reduce((s, d) => s + d.value, 0)
            return (
              <div key={stage} className="w-64 shrink-0">
                <div className={`rounded-t-xl border border-b-0 border-slate-200 border-t-[3px] bg-white px-3 py-2.5 ${stageAccent[stage]}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-navy-900">{stage}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">{deals.length}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-400">{fmtAEDShort(total)}</p>
                </div>
                <div className="space-y-2 rounded-b-xl border border-t-0 border-slate-200 bg-slate-50/60 p-2">
                  {deals.map(d => (
                    <div key={d.id} className="cursor-pointer rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-px hover:border-navy-200 hover:shadow-md">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-semibold leading-snug text-navy-900">{d.client}</p>
                        {d.daysInStage > 14 && (
                          <span title={`Stuck ${d.daysInStage} days`} className="text-red-500"><Flag size={13} fill="currentColor" /></span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-slate-500">{d.product}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${typeColor[d.projectType]}`}>{d.projectType}</span>
                        <span className="text-[12px] font-bold text-navy-900">{fmtAEDShort(d.value)}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-50 pt-2">
                        <span className="text-[11px] text-slate-400">{d.salesperson.split(' ')[0]} {d.salesperson.split(' ')[1]?.[0]}.</span>
                        <span className={`text-[11px] font-medium ${d.daysInStage > 14 ? 'text-red-600' : 'text-slate-400'}`}>{d.daysInStage}d in stage</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="red"><Flag size={11} /> 4 deals stuck &gt;14 days — total AED 1.36M at risk of going stale</Badge>
        <Badge tone="green">Win rate this quarter: 21% (+3pt)</Badge>
        <Badge tone="navy">Avg. cycle: enquiry → installed in 31 days</Badge>
      </div>
    </div>
  )
}
