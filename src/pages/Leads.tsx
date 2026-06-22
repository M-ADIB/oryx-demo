import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardHeader, PageHeader, AIInsight, Badge, statusTone } from '../components/ui'
import { LEADS, FUNNEL, SOURCE_ROI, type LeadSource } from '../data/mock'

const sourceTone: Record<LeadSource, 'navy' | 'amber' | 'green' | 'blue' | 'slate' | 'red'> = {
  Website: 'navy', Instagram: 'amber', Referral: 'green',
  'Showroom Walk-in': 'blue', 'Google Ads': 'slate', WhatsApp: 'green',
}

export function Leads() {
  return (
    <div className="space-y-5">
      <PageHeader title="Leads & Sources" subtitle="118 leads this month · cost per lead AED 142 (−11% vs May)" />

      <AIInsight>
        <strong>Instagram leads convert 2.3× better for premium pergolas</strong> at the lowest cost per won deal (AED 1,860). Recommendation: reallocate AED 15K/month from Google Ads into Instagram pergola campaigns ahead of the Q3 outdoor-living season.
      </AIInsight>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Conversion Funnel" subtitle="Last 90 days — drop-off at each gate" />
          <div className="space-y-3 px-5 pb-5">
            {FUNNEL.map((f, i) => (
              <div key={f.stage}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[13px] font-semibold text-navy-900">{f.stage}</span>
                  <span className="text-[12px] text-slate-500">
                    {f.count} · {f.pct}%
                    {i > 0 && <span className="ml-2 font-semibold text-red-500">−{FUNNEL[i - 1].pct - f.pct}pt</span>}
                  </span>
                </div>
                <div className="h-7 overflow-hidden rounded-lg bg-slate-100">
                  <div
                    className="flex h-full items-center rounded-lg bg-gradient-to-r from-navy-900 to-navy-600 pl-3 text-[11px] font-bold text-white transition-all duration-700"
                    style={{ width: `${f.pct}%` }}
                  >
                    {f.count}
                  </div>
                </div>
              </div>
            ))}
            <p className="pt-1 text-[12px] text-slate-400">Biggest leak: Quote → Won (−25pt). See AI countermeasure on the Pipeline board.</p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Source ROI — Spend vs Revenue" subtitle="This quarter (AED thousands)" />
          <div className="h-72 px-2 pb-4">
            <ResponsiveContainer>
              <BarChart data={SOURCE_ROI.map(s => ({ ...s, spendK: s.spend / 1000, revK: s.revenue / 1000 }))} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                <XAxis dataKey="source" tick={{ fontSize: 10, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}K`} />
                <Tooltip formatter={(v, n) => [`AED ${v}K`, n === 'spendK' ? 'Spend' : 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend formatter={v => (v === 'spendK' ? 'Marketing spend' : 'Revenue attributed')} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="spendK" fill="#d99421" radius={[4, 4, 0, 0]} maxBarSize={26} />
                <Bar dataKey="revK" fill="#092839" radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Incoming Leads" subtitle="Scored automatically from engagement, budget signals, and area" action={<Badge tone="amber">5 Hot — respond within 1 hr SLA</Badge>} />
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                {['Lead', 'Source', 'Score', 'Interest', 'Location', 'Received', 'Owner'].map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {LEADS.map(l => (
                <tr key={l.id} className="border-t border-slate-50 text-[13px] transition hover:bg-navy-50/40">
                  <td className="px-3 py-2.5 font-semibold text-navy-900">{l.name}</td>
                  <td className="px-3 py-2.5"><Badge tone={sourceTone[l.source]}>{l.source}</Badge></td>
                  <td className="px-3 py-2.5"><Badge tone={statusTone(l.score)}>{l.score}</Badge></td>
                  <td className="px-3 py-2.5 text-slate-600">{l.interest}</td>
                  <td className="px-3 py-2.5 text-slate-500">{l.location}</td>
                  <td className="px-3 py-2.5 text-slate-400">{l.received}</td>
                  <td className="px-3 py-2.5 text-slate-600">{l.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
