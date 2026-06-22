import { useState } from 'react'
import { AlertTriangle, MapPin } from 'lucide-react'
import clsx from 'clsx'
import { Card, CardHeader, PageHeader, Badge } from '../components/ui'
import { APPOINTMENTS, type ApptType } from '../data/mock'

const typeStyle: Record<ApptType, { dot: string; chip: string }> = {
  'Site Visit': { dot: 'bg-sky-500', chip: 'bg-sky-50 text-sky-700 border-sky-200' },
  'Installation': { dot: 'bg-navy-900', chip: 'bg-navy-50 text-navy-800 border-navy-200' },
  'Showroom Consultation': { dot: 'bg-gold-500', chip: 'bg-gold-50 text-gold-700 border-gold-200' },
  'Service Call': { dot: 'bg-sage-500', chip: 'bg-sage-50 text-sage-700 border-sage-200' },
}

// June 2026: 1st is a Monday, 30 days
const JUNE_OFFSET = 0
const TODAY = 11

export function CalendarPage() {
  const [selected, setSelected] = useState(TODAY)
  const dayAppts = APPOINTMENTS.filter(a => a.day === selected)

  return (
    <div className="space-y-5">
      <PageHeader title="Appointment Calendar" subtitle="June 2026 · heijunka — level the schedule, smooth the flow">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(typeStyle) as ApptType[]).map(t => (
            <span key={t} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <span className={clsx('h-2 w-2 rounded-full', typeStyle[t].dot)} />{t}
            </span>
          ))}
        </div>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="June 2026" subtitle="Month view" action={
            APPOINTMENTS.some(a => a.conflict) ? <Badge tone="red"><AlertTriangle size={11} /> 1 scheduling conflict</Badge> : undefined
          } />
          <div className="px-4 pb-4">
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">{d}</div>
              ))}
              {Array.from({ length: JUNE_OFFSET }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                const appts = APPOINTMENTS.filter(a => a.day === day)
                const hasConflict = appts.some(a => a.conflict)
                return (
                  <button
                    key={day}
                    onClick={() => setSelected(day)}
                    className={clsx(
                      'relative min-h-[68px] rounded-lg border p-1.5 text-left transition',
                      selected === day ? 'border-navy-900 bg-navy-50 ring-1 ring-navy-900' : 'border-slate-100 hover:border-navy-200 hover:bg-slate-50',
                      day === TODAY && selected !== day && 'border-gold-300 bg-gold-50/50',
                    )}
                  >
                    <span className={clsx('text-[12px] font-semibold', day === TODAY ? 'flex h-5 w-5 items-center justify-center rounded-full bg-navy-900 text-white' : 'text-slate-600')}>{day}</span>
                    <div className="mt-1 flex flex-wrap gap-0.5">
                      {appts.slice(0, 4).map(a => (
                        <span key={a.id} className={clsx('h-1.5 w-1.5 rounded-full', typeStyle[a.type].dot)} />
                      ))}
                    </div>
                    {hasConflict && <AlertTriangle size={11} className="absolute right-1 top-1.5 text-red-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title={selected === TODAY ? "Today's Appointments" : `Appointments — ${selected} June`}
            subtitle={`${dayAppts.length} scheduled`}
          />
          <div className="space-y-2.5 px-4 pb-4">
            {dayAppts.length === 0 && <p className="py-6 text-center text-[13px] text-slate-400">No appointments — capacity available for pull scheduling.</p>}
            {dayAppts.map(a => (
              <div key={a.id} className={clsx('rounded-xl border p-3 transition hover:shadow-sm', a.conflict ? 'border-red-200 bg-red-50/50' : 'border-slate-100')}>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-navy-900">{a.time}</span>
                  <span className={clsx('rounded-full border px-2 py-0.5 text-[10px] font-semibold', typeStyle[a.type].chip)}>{a.type}</span>
                </div>
                <p className="mt-1.5 text-[13px] font-semibold text-navy-800">{a.client}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500"><MapPin size={11} /> {a.location}</p>
                <p className="mt-1 text-[12px] text-slate-400">Assigned: {a.assignee}</p>
                {a.conflict && (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-red-600">
                    <AlertTriangle size={11} /> Conflict: Sarah Mitchell double-booked at 14:00 — suggest Priya Sharma (free)
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
