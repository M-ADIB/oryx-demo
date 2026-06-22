import { useState } from 'react'
import { MapPin, Truck } from 'lucide-react'
import { Card, CardHeader, PageHeader, AIInsight, Badge, ProgressBar, statusTone } from '../components/ui'
import { TEAMS, type Team } from '../data/mock'

const statusBarTone = (s: Team['status']) => s === 'On Track' ? 'green' as const : s === 'At Risk' ? 'amber' as const : 'red' as const

export function Installs() {
  const [filter, setFilter] = useState<'All' | Team['city']>('All')
  const teams = filter === 'All' ? TEAMS : TEAMS.filter(t => t.city === filter)
  const counts = {
    onTrack: TEAMS.filter(t => t.status === 'On Track').length,
    atRisk: TEAMS.filter(t => t.status === 'At Risk').length,
    delayed: TEAMS.filter(t => t.status === 'Delayed').length,
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Installation Tracker" subtitle="18 teams · 47 active installations across Dubai, Abu Dhabi & Riyadh">
        <div className="flex gap-1.5">
          {(['All', 'Dubai', 'Abu Dhabi', 'Riyadh'] as const).map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${filter === c ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-navy-300'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </PageHeader>

      <AIInsight>
        Predictive: <strong>Job #1284 (Whitmore House) likely to overrun by 2 days</strong> based on 14 similar past skylight installations. Recommended countermeasure: notify the client proactively today and pull the flashing-kit inspection forward.
      </AIInsight>

      <div className="flex flex-wrap gap-2">
        <Badge tone="green">● {counts.onTrack} On Track</Badge>
        <Badge tone="amber">● {counts.atRisk} At Risk</Badge>
        <Badge tone="red">● {counts.delayed} Delayed</Badge>
        <Badge tone="navy"><Truck size={11} /> CIV fleet: 13 stocked · 3 restock due · 2 in transit</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map(t => (
          <Card key={t.id} hover className="p-4 animate-fade-up">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Team {t.id} · {t.lead}</p>
                <p className="mt-0.5 text-sm font-bold text-navy-900">{t.client}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500"><MapPin size={11} /> {t.area}, {t.city}</p>
              </div>
              <Badge tone={statusTone(t.status)}>{t.status}</Badge>
            </div>
            <p className="mt-2.5 text-[12px] text-slate-600">{t.products}</p>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="font-semibold text-navy-900">Job {t.job} · {t.progress}%</span>
                <span className="text-slate-400">Due {t.due}</span>
              </div>
              <ProgressBar value={t.progress} tone={statusBarTone(t.status)} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-2.5">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Truck size={12} className="text-navy-400" /> CIV: <Badge tone={statusTone(t.civ)}>{t.civ}</Badge>
              </span>
              <span className="text-[11px] text-slate-400">Quality {t.qualityScore}/10</span>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Active Sites — Region View" subtitle="Visual management board: every site, one glance" />
        <div className="grid gap-3 px-4 pb-4 sm:grid-cols-3">
          {(['Dubai', 'Abu Dhabi', 'Riyadh'] as const).map(city => {
            const cityTeams = TEAMS.filter(t => t.city === city)
            return (
              <div key={city} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-bold text-navy-900">{city}</p>
                  <span className="text-[11px] text-slate-400">{cityTeams.length} sites</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {cityTeams.map(t => (
                    <div
                      key={t.id}
                      title={`Team ${t.id} — ${t.client} (${t.progress}%)`}
                      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[11px] font-bold text-white transition hover:scale-110 ${
                        t.status === 'On Track' ? 'bg-sage-500' : t.status === 'At Risk' ? 'bg-gold-400' : 'bg-red-500'
                      }`}
                    >
                      {t.id}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
