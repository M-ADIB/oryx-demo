import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardHeader, PageHeader, AIInsight, Badge, statusTone } from '../components/ui'
import { QUOTES, INVOICES, AGING, fmtAED, fmtAEDShort } from '../data/mock'

export function Quotes() {
  const paid = INVOICES.filter(i => i.status === 'Paid').reduce((s, i) => s + i.value, 0)
  const pending = INVOICES.filter(i => i.status === 'Pending').reduce((s, i) => s + i.value, 0)
  const overdue = INVOICES.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.value, 0)

  return (
    <div className="space-y-5">
      <PageHeader title="Quotes & Billing" subtitle="12 open quotes · AED 2.89M quoted value outstanding" />

      <AIInsight>
        <strong>AED 380K in overdue invoices — 3 clients account for 80%</strong> (Atlantis F&amp;B Pavilion, Sushi Samba Tower, The Castellano Villa). A polite payment-reminder sequence has been drafted for each — review and send with one click.
        <button className="ml-2 text-[13px] font-semibold text-navy-900 underline decoration-gold-400 underline-offset-2 hover:text-navy-600">Review drafts</button>
      </AIInsight>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card hover className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Paid This Month</p>
          <p className="mt-2 text-2xl font-bold text-sage-600">{fmtAEDShort(paid + 2_840_000)}</p>
          <p className="mt-1 text-xs text-slate-400">38 invoices settled</p>
        </Card>
        <Card hover className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Pending</p>
          <p className="mt-2 text-2xl font-bold text-gold-600">{fmtAEDShort(pending)}</p>
          <p className="mt-1 text-xs text-slate-400">{INVOICES.filter(i => i.status === 'Pending').length} invoices within terms</p>
        </Card>
        <Card hover className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Overdue</p>
          <p className="mt-2 text-2xl font-bold text-red-600">{fmtAEDShort(overdue)}</p>
          <p className="mt-1 text-xs text-slate-400">{INVOICES.filter(i => i.status === 'Overdue').length} invoices · oldest 45 days</p>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Quotes" subtitle="Sorted by recency · red rows breach the 48-hr approval standard" action={<Badge tone="amber">3 drafts awaiting approval</Badge>} />
          <div className="overflow-x-auto px-2 pb-3">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                  {['Quote #', 'Client', 'Products', 'Value', 'Status', 'Days Out', 'Owner'].map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {QUOTES.map(q => (
                  <tr key={q.id} className="border-t border-slate-50 text-[13px] transition hover:bg-navy-50/40">
                    <td className="px-3 py-2.5 font-mono text-[12px] font-semibold text-navy-700">{q.id}</td>
                    <td className="px-3 py-2.5 font-semibold text-navy-900">{q.client}</td>
                    <td className="px-3 py-2.5 text-slate-500">{q.products}</td>
                    <td className="px-3 py-2.5 font-semibold text-navy-900">{fmtAED(q.value)}</td>
                    <td className="px-3 py-2.5"><Badge tone={statusTone(q.status)}>{q.status}</Badge></td>
                    <td className={`px-3 py-2.5 font-medium ${q.days > 14 ? 'text-red-600' : 'text-slate-500'}`}>{q.days}d</td>
                    <td className="px-3 py-2.5 text-slate-500">{q.owner.split(' ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Receivables Aging" subtitle="AED by bucket" />
            <div className="h-52 px-2 pb-4">
              <ResponsiveContainer>
                <BarChart data={AGING.map(a => ({ ...a, k: a.amount / 1000 }))} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                  <XAxis dataKey="bucket" tick={{ fontSize: 9, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#7a8a94' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}K`} />
                  <Tooltip formatter={(v) => [`AED ${v}K`, 'Outstanding']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="k" radius={[4, 4, 0, 0]} maxBarSize={32}>
                    {AGING.map((a, i) => (
                      <Cell key={a.bucket} fill={i === 0 ? '#428a64' : i === 1 ? '#e3ab37' : i === 2 ? '#d99421' : '#dc2626'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <CardHeader title="Recent Invoices" />
            <div className="space-y-2 px-4 pb-4">
              {INVOICES.slice(0, 6).map(i => (
                <div key={i.id} className="flex items-center justify-between rounded-lg border border-slate-50 px-3 py-2 transition hover:bg-slate-50">
                  <div>
                    <p className="text-[12px] font-semibold text-navy-900">{i.client}</p>
                    <p className="text-[11px] text-slate-400">{i.id} · due {i.due}{i.daysOverdue ? ` · ${i.daysOverdue}d late` : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-navy-900">{fmtAEDShort(i.value)}</p>
                    <Badge tone={statusTone(i.status)}>{i.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
