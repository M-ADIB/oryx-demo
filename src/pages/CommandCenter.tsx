import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts'
import { Banknote, Hammer, PieChart, Star, Timer, AlertTriangle, FileText, Wrench, CreditCard, UserPlus, Lightbulb, ArrowRight } from 'lucide-react'
import { Card, CardHeader, StatCard, AIInsight, Badge } from '../components/ui'
import { REVENUE_TREND, ANDON_ALERTS, ACTIVITY, type Activity } from '../data/mock'

const actIcon: Record<Activity['type'], React.ReactNode> = {
  quote: <FileText size={14} className="text-sky-600" />,
  install: <Wrench size={14} className="text-navy-600" />,
  payment: <CreditCard size={14} className="text-sage-600" />,
  lead: <UserPlus size={14} className="text-gold-600" />,
  kaizen: <Lightbulb size={14} className="text-gold-600" />,
}

const deptSnapshot = [
  { dept: 'Sales', metrics: [['Quotes out', 'AED 2.46M'], ['Win rate', '21%'], ['Avg. deal', 'AED 186K']] },
  { dept: 'Marketing', metrics: [['Leads MTD', '118'], ['Cost / lead', 'AED 142'], ['Best ROI', 'Referral 28×']] },
  { dept: 'Operations', metrics: [['Active installs', '47'], ['On-time', '94%'], ['Rework rate', '2.1%']] },
  { dept: 'Customer Care', metrics: [['NPS', '71'], ['Avg. response', '1.8 hrs'], ['Open tickets', '6']] },
]

export function CommandCenter() {
  return (
    <div className="space-y-5">
      <AIInsight>
        AI detected: <strong>Installation Team 12 has completed jobs 23% faster this month</strong> — their pre-cut gasket method could be standardized across all 18 teams. Estimated waste eliminated: <strong>27 hrs/month</strong>.
        <button className="ml-2 inline-flex items-center gap-1 text-[13px] font-semibold text-navy-900 underline decoration-gold-400 underline-offset-2 hover:text-navy-600">
          Create standard work doc <ArrowRight size={13} />
        </button>
      </AIInsight>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Monthly Revenue" value="AED 4.2M" delta="+12%" deltaUp sub="vs May" icon={<Banknote size={18} />} />
        <StatCard label="Active Installations" value="47" delta="+5" deltaUp sub="across 3 cities" icon={<Hammer size={18} />} />
        <StatCard label="Pipeline Value" value="AED 8.6M" delta="+8%" deltaUp sub="29 open deals" icon={<PieChart size={18} />} />
        <StatCard label="Customer Satisfaction" value="4.8 / 5" delta="+0.2" deltaUp sub="last 90 days" icon={<Star size={18} />} />
        <StatCard label="On-Time Installation" value="94%" delta="+1.4pt" deltaUp sub="target 95%" icon={<Timer size={18} />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue — 12-Month Trend" subtitle="Actual vs target (AED millions)" action={<Badge tone="green">On plan 4 of last 5 months</Badge>} />
          <div className="h-72 px-2 pb-4">
            <ResponsiveContainer>
              <ComposedChart data={REVENUE_TREND} margin={{ top: 10, right: 16, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#092839" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#092839" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} domain={[2, 5]} tickFormatter={v => `${v}M`} />
                <Tooltip
                  formatter={(v, name) => [`AED ${v}M`, name === 'revenue' ? 'Revenue' : 'Target']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#092839" strokeWidth={2.5} fill="url(#rev)" />
                <Line type="monotone" dataKey="target" stroke="#d99421" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Andon Alerts"
            subtitle="Visual management — problems surfaced, not hidden"
            action={<Badge tone="red"><AlertTriangle size={11} /> {ANDON_ALERTS.filter(a => a.severity === 'red').length} critical</Badge>}
          />
          <div className="space-y-2.5 px-4 pb-4">
            {ANDON_ALERTS.map(a => (
              <div key={a.id} className={`rounded-lg border p-3 transition hover:shadow-sm ${a.severity === 'red' ? 'border-red-200 bg-red-50/60' : 'border-gold-200 bg-gold-50/60'}`}>
                <div className="flex items-start gap-2">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full animate-pulse-dot ${a.severity === 'red' ? 'bg-red-500' : 'bg-gold-500'}`} />
                  <div>
                    <p className="text-[13px] font-semibold leading-snug text-navy-900">{a.title}</p>
                    <p className="mt-1 text-[12px] leading-snug text-slate-500">{a.detail}</p>
                    <p className="mt-1.5 text-[11px] text-slate-400">{a.time} · {a.owner}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader title="Live Activity" subtitle="Across all departments" action={<span className="flex items-center gap-1.5 text-[11px] font-medium text-sage-600"><span className="h-1.5 w-1.5 rounded-full bg-sage-500 animate-pulse-dot" />Live</span>} />
          <div className="px-4 pb-4">
            {ACTIVITY.map((a, i) => (
              <div key={a.id} className={`flex items-start gap-3 py-2.5 ${i !== ACTIVITY.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50">{actIcon[a.type]}</div>
                <div>
                  <p className="text-[13px] leading-snug text-navy-800">{a.text}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-2">
          {deptSnapshot.map(d => (
            <Card key={d.dept} hover className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-navy-900">{d.dept}</h3>
                <Badge tone="navy">Snapshot</Badge>
              </div>
              <div className="mt-4 space-y-3">
                {d.metrics.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-[13px] text-slate-500">{k}</span>
                    <span className="text-[13px] font-bold text-navy-900">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
