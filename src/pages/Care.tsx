import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Star, Clock, Inbox } from 'lucide-react'
import { Card, CardHeader, PageHeader, AIInsight, Badge, statusTone, StatCard } from '../components/ui'
import { FEEDBACK, NPS_TREND } from '../data/mock'

export function Care() {
  return (
    <div className="space-y-5">
      <PageHeader title="Customer Care" subtitle="Every complaint is a gift — surface it, solve it, standardize the fix" />

      <AIInsight>
        Sentiment analysis: <strong>"communication during delays" is the #1 recurring complaint theme this quarter</strong> (5 of 11 complaints). Root cause: delay notifications depend on individual team leads. Countermeasure: automatic client notification when any job slips &gt;4 hrs — pilot drafted for Teams 7 and 9.
      </AIInsight>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="NPS (June)" value="71" delta="+4" deltaUp sub="world-class ≥ 70" icon={<Star size={18} />} />
        <StatCard label="Avg. First Response" value="1.8 hrs" delta="−22%" deltaUp sub="target 2 hrs" icon={<Clock size={18} />} />
        <StatCard label="Open Tickets" value="6" sub="2 complaints · 4 service" icon={<Inbox size={18} />} />
        <StatCard label="Post-Install Rating" value="4.8 / 5" delta="+0.2" deltaUp sub="last 90 days" icon={<Star size={18} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Feedback Inbox" subtitle="Ratings, complaints and service requests — newest first" action={<Badge tone="amber">2 need action today</Badge>} />
          <div className="space-y-2.5 px-4 pb-4">
            {FEEDBACK.map(f => (
              <div key={f.id} className="rounded-xl border border-slate-100 p-3.5 transition hover:border-navy-200 hover:shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-navy-900">{f.client}</span>
                    <Badge tone={f.type === 'Complaint' ? 'red' : f.type === 'Rating' ? 'green' : 'blue'}>{f.type}</Badge>
                    {f.rating && (
                      <span className="flex items-center gap-0.5 text-[12px] font-semibold text-gold-600">
                        {Array.from({ length: f.rating }).map((_, i) => <Star key={i} size={11} className="fill-gold-400 text-gold-400" />)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{f.time}</span>
                    <Badge tone={statusTone(f.status)}>{f.status}</Badge>
                  </div>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">"{f.text}"</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="NPS Trend" subtitle="2026 — crossing into world-class" />
            <div className="h-48 px-2 pb-4">
              <ResponsiveContainer>
                <LineChart data={NPS_TREND} margin={{ top: 10, right: 12, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 80]} tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="nps" name="NPS" stroke="#092839" strokeWidth={2.5} dot={{ r: 3.5, fill: '#d99421', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <CardHeader title="Response Time by Channel" subtitle="Median, this month" />
            <div className="space-y-3 px-5 pb-5">
              {[
                ['WhatsApp', '24 min', 92], ['Phone', '— live', 100],
                ['Email', '3.1 hrs', 68], ['Website form', '4.2 hrs', 55],
              ].map(([ch, t, pct]) => (
                <div key={ch as string}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="font-medium text-navy-900">{ch}</span>
                    <span className="text-slate-500">{t}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-navy-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
              <p className="pt-1 text-[11px] text-slate-400">Kaizen target: all channels under 2 hrs by Q3.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
