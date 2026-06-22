import { useState } from 'react'
import clsx from 'clsx'
import { Card, CardHeader, PageHeader, Badge } from '../components/ui'

function Toggle({ defaultOn = true }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(!on)}
      className={clsx('relative h-5.5 w-10 rounded-full transition-colors', on ? 'bg-navy-900' : 'bg-slate-200')}
      style={{ height: 22 }}
    >
      <span className={clsx('absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all', on ? 'left-[20px]' : 'left-0.5')} />
    </button>
  )
}

export function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader title="Settings" subtitle="Workspace configuration — Oryx Doors & Windows" />

      <Card>
        <CardHeader title="Organisation" />
        <div className="space-y-3 px-5 pb-5">
          {[
            ['Company', 'Oryx Doors & Windows LLC'],
            ['Locations', 'Dubai (HQ) · Abu Dhabi · Riyadh'],
            ['Employees', '158 · 100+ installers · 18 installation teams'],
            ['Currency', 'AED — UAE Dirham'],
            ['Fiscal year', 'January – December'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
              <span className="text-[13px] text-slate-500">{k}</span>
              <span className="text-[13px] font-semibold text-navy-900">{v}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Lean / Visual Management" subtitle="How the Digital Lean layer behaves" />
        <div className="space-y-4 px-5 pb-5">
          {[
            ['Andon alerts', 'Surface problems instantly to the Command Center', true],
            ['AI insights (Oryx Intelligence)', 'Root-cause analysis and countermeasure suggestions', true],
            ['Predictive overrun warnings', 'Flag installations likely to slip based on history', true],
            ['Kaizen submissions from all staff', 'Anyone can submit improvement ideas from mobile', true],
            ['Auto client notification on delay >4 hrs', 'Pilot — Teams 7 & 9', false],
          ].map(([title, desc, on]) => (
            <div key={title as string} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold text-navy-900">{title}</p>
                <p className="text-[12px] text-slate-500">{desc}</p>
              </div>
              <Toggle defaultOn={on as boolean} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Team & Access" action={<Badge tone="navy">24 active users</Badge>} />
        <div className="space-y-2 px-5 pb-5">
          {[
            ['Guy Dawson', 'Managing Director', 'Owner'],
            ['Hannah Lewis', 'Operations Coordinator', 'Admin'],
            ['Khalid Al Mansoori', 'Sales Lead', 'Manager'],
            ['Layla Khoury', 'Customer Care Lead', 'Manager'],
          ].map(([name, role, access]) => (
            <div key={name} className="flex items-center justify-between rounded-lg border border-slate-50 px-3 py-2.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">
                  {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-navy-900">{name}</p>
                  <p className="text-[11px] text-slate-400">{role}</p>
                </div>
              </div>
              <Badge tone={access === 'Owner' ? 'amber' : 'slate'}>{access}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
