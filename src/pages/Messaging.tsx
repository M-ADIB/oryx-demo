import { useState } from 'react'
import { Send, Hash, ClipboardList, FileInput, CheckSquare } from 'lucide-react'
import clsx from 'clsx'
import { Card, CardHeader, PageHeader, Badge } from '../components/ui'
import { CHANNELS, MESSAGES, type Msg } from '../data/mock'

const FORMS = [
  { icon: <FileInput size={18} />, title: 'New Enquiry Form', desc: 'Capture lead source, product interest, budget band and site location. Feeds the Leads board automatically.', fields: 9, submitted: 118 },
  { icon: <ClipboardList size={18} />, title: 'Site Visit Report', desc: 'Measurements, photos, access notes and product recommendation — syncs straight into the quote engine.', fields: 14, submitted: 187 },
  { icon: <CheckSquare size={18} />, title: 'Post-Installation Inspection', desc: '12-angle photo checklist, quality scoring, client signature and warranty registration in one flow.', fields: 18, submitted: 164 },
]

export function Messaging() {
  const [channel, setChannel] = useState('ops')
  const [draft, setDraft] = useState('')
  const [extra, setExtra] = useState<Record<string, Msg[]>>({})
  const msgs = [...MESSAGES[channel], ...(extra[channel] ?? [])]

  const send = () => {
    if (!draft.trim()) return
    setExtra(e => ({
      ...e,
      [channel]: [...(e[channel] ?? []), { id: Date.now(), from: 'Guy Dawson', role: 'Managing Director', text: draft, time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), me: true }],
    }))
    setDraft('')
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Messaging & Intake" subtitle="One place for cross-department flow — no more WhatsApp silos" />

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="flex h-[520px] overflow-hidden xl:col-span-2">
          <div className="w-44 shrink-0 border-r border-slate-100 bg-slate-50/50 p-2">
            <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Channels</p>
            {CHANNELS.map(c => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                className={clsx(
                  'mb-0.5 flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition',
                  channel === c.id ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-white',
                )}
              >
                <span className="flex items-center gap-1.5 truncate"><Hash size={13} className="shrink-0 opacity-50" />{c.name}</span>
                {c.unread > 0 && channel !== c.id && (
                  <span className="rounded-full bg-gold-500 px-1.5 text-[10px] font-bold text-white">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-bold text-navy-900"># {CHANNELS.find(c => c.id === channel)?.name}</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map(m => (
                <div key={m.id} className={clsx('flex', m.me && 'justify-end')}>
                  <div className={clsx('max-w-[80%]', m.me && 'text-right')}>
                    <p className="text-[11px] text-slate-400">
                      <span className="font-bold text-navy-800">{m.from}</span> · {m.role} · {m.time}
                    </p>
                    <div className={clsx(
                      'mt-1 inline-block rounded-2xl px-3.5 py-2.5 text-left text-[13px] leading-relaxed',
                      m.me ? 'bg-navy-900 text-white rounded-tr-sm' : 'bg-slate-100 text-navy-800 rounded-tl-sm',
                    )}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-slate-100 p-3">
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={`Message # ${CHANNELS.find(c => c.id === channel)?.name}…`}
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] outline-none focus:border-navy-300 focus:bg-white"
              />
              <button onClick={send} className="rounded-lg bg-navy-900 p-2 text-white transition hover:bg-navy-700"><Send size={15} /></button>
            </div>
          </div>
        </Card>

        <Card className="self-start">
          <CardHeader title="Intake Forms" subtitle="Standard work — data captured once, used everywhere" action={<Badge tone="green">Live</Badge>} />
          <div className="space-y-3 px-4 pb-4">
            {FORMS.map(f => (
              <div key={f.title} className="cursor-pointer rounded-xl border border-slate-100 p-4 transition hover:border-navy-200 hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700">{f.icon}</div>
                  <p className="text-[13px] font-bold text-navy-900">{f.title}</p>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{f.desc}</p>
                <div className="mt-2.5 flex gap-2">
                  <Badge tone="slate">{f.fields} fields</Badge>
                  <Badge tone="navy">{f.submitted} submissions this quarter</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
