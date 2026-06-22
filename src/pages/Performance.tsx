import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Trophy, Star } from 'lucide-react'
import { Card, CardHeader, PageHeader, AIInsight, Badge, ProgressBar } from '../components/ui'
import { TEAMS, TEAM_MONTHLY } from '../data/mock'

export function Performance() {
  const ranked = [...TEAMS].sort((a, b) => b.ciScore - a.ciScore)
  const top3 = ranked.slice(0, 3)

  return (
    <div className="space-y-5">
      <PageHeader title="Team Performance" subtitle="Respect for people · measure to improve, not to blame" />

      <AIInsight>
        AI coaching: <strong>Team 4's rework rate increased 15%</strong> this month — recurring theme is sealing finish on folding doors. Countermeasure: schedule the sealing best-practice refresher (standard work doc SW-114) before their phase-2 start on 21 Jun.
      </AIInsight>

      <div className="grid gap-4 sm:grid-cols-3">
        {top3.map((t, i) => (
          <Card key={t.id} hover className="relative overflow-hidden p-5">
            {i === 0 && <div className="absolute right-0 top-0 rounded-bl-xl bg-gold-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-navy-900">#1 This Month</div>}
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-black text-white ${i === 0 ? 'bg-gold-500' : 'bg-navy-900'}`}>
                {i === 0 ? <Trophy size={18} /> : `#${i + 1}`}
              </div>
              <div>
                <p className="text-sm font-bold text-navy-900">Team {t.id} — {t.lead}</p>
                <p className="text-[11px] text-slate-400">{t.installs} installs · {t.onTimeRate}% on-time</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-slate-500">Continuous Improvement Score</span>
                <span className="font-bold text-navy-900">{t.ciScore}/100</span>
              </div>
              <ProgressBar value={t.ciScore} tone={i === 0 ? 'amber' : 'navy'} />
            </div>
            <div className="mt-3 flex items-center gap-1 text-[12px] text-slate-500">
              <Star size={12} className="fill-gold-400 text-gold-400" /> {t.rating} customer rating · Quality {t.qualityScore}/10
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="Monthly Installations Completed" subtitle="All teams, 2026" />
          <div className="h-60 px-2 pb-4">
            <ResponsiveContainer>
              <BarChart data={TEAM_MONTHLY} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Bar dataKey="installs" name="Installations" fill="#092839" radius={[5, 5, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="On-Time Rate Trend" subtitle="Kaizen target: 95% by Q3" />
          <div className="h-60 px-2 pb-4">
            <ResponsiveContainer>
              <LineChart data={TEAM_MONTHLY} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eef2" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#7a8a94' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'On-time']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Line type="monotone" dataKey="onTime" stroke="#428a64" strokeWidth={2.5} dot={{ r: 3, fill: '#428a64' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Full Leaderboard" subtitle="Ranked by Continuous Improvement Score (installs · on-time · quality · rating · kaizen participation)" />
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                {['Rank', 'Team', 'Lead Installer', 'Installs', 'On-Time', 'Quality', 'Rating', 'CI Score'].map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ranked.map((t, i) => (
                <tr key={t.id} className="border-t border-slate-50 text-[13px] transition hover:bg-navy-50/40">
                  <td className="px-3 py-2.5 font-bold text-slate-400">{i + 1}</td>
                  <td className="px-3 py-2.5 font-semibold text-navy-900">Team {t.id}</td>
                  <td className="px-3 py-2.5 text-slate-600">{t.lead}</td>
                  <td className="px-3 py-2.5 text-slate-600">{t.installs}</td>
                  <td className="px-3 py-2.5">
                    <Badge tone={t.onTimeRate >= 92 ? 'green' : t.onTimeRate >= 86 ? 'amber' : 'red'}>{t.onTimeRate}%</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-slate-600">{t.qualityScore}/10</td>
                  <td className="px-3 py-2.5 text-slate-600">★ {t.rating}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24"><ProgressBar value={t.ciScore} tone={t.ciScore >= 80 ? 'green' : t.ciScore >= 65 ? 'navy' : 'amber'} /></div>
                      <span className="font-bold text-navy-900">{t.ciScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
