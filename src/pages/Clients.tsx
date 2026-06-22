import { useMemo, useState } from 'react'
import { Search, X, FileText, MessageSquare, ShieldCheck, FolderOpen } from 'lucide-react'
import { Card, CardHeader, PageHeader, Badge, statusTone } from '../components/ui'
import { CLIENTS, fmtAEDShort, type Client } from '../data/mock'

export function Clients() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'All' | Client['type']>('All')
  const [selected, setSelected] = useState<Client | null>(null)

  const filtered = useMemo(() =>
    CLIENTS.filter(c =>
      (typeFilter === 'All' || c.type === typeFilter) &&
      (c.name.toLowerCase().includes(query.toLowerCase()) || c.location.toLowerCase().includes(query.toLowerCase()))
    ), [query, typeFilter])

  return (
    <div className="space-y-5">
      <PageHeader title="Client List" subtitle={`${CLIENTS.length} clients · every one covered by the Lifetime Ownership Warranty`}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search name or area…"
              className="rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-[13px] outline-none focus:border-navy-300 focus:ring-2 focus:ring-navy-100"
            />
          </div>
          {(['All', 'Residential', 'Commercial', 'F&B'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition ${typeFilter === t ? 'bg-navy-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-navy-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </PageHeader>

      <Card>
        <CardHeader title={`${filtered.length} clients`} subtitle="Click any row for the full client file" />
        <div className="overflow-x-auto px-2 pb-3">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-slate-400">
                {['Client', 'Type', 'Location', 'Projects', 'Lifetime Value', 'Warranty', 'Last Interaction'].map(h => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className="cursor-pointer border-t border-slate-50 text-[13px] transition hover:bg-navy-50/40"
                >
                  <td className="px-3 py-2.5 font-semibold text-navy-900">{c.name}</td>
                  <td className="px-3 py-2.5"><Badge tone={c.type === 'Residential' ? 'navy' : c.type === 'F&B' ? 'amber' : 'slate'}>{c.type}</Badge></td>
                  <td className="px-3 py-2.5 text-slate-500">{c.location}, {c.city}</td>
                  <td className="px-3 py-2.5 text-slate-600">{c.projects}</td>
                  <td className="px-3 py-2.5 font-semibold text-navy-900">{fmtAEDShort(c.lifetimeValue)}</td>
                  <td className="px-3 py-2.5"><Badge tone={statusTone(c.warranty)}><ShieldCheck size={11} /> {c.warranty}</Badge></td>
                  <td className="px-3 py-2.5 text-slate-400">{c.lastInteraction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-navy-950/30" onClick={() => setSelected(null)} />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl animate-fade-up">
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-navy-900">{selected.name}</h2>
                <p className="mt-0.5 text-[13px] text-slate-500">{selected.location}, {selected.city} · {selected.type}</p>
                <div className="mt-2 flex gap-2">
                  <Badge tone={statusTone(selected.warranty)}><ShieldCheck size={11} /> {selected.warranty}</Badge>
                  <Badge tone="navy">{fmtAEDShort(selected.lifetimeValue)} lifetime</Badge>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><X size={18} /></button>
            </div>
            <div className="space-y-5 p-5">
              <section>
                <h3 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-400"><FolderOpen size={13} /> Project History</h3>
                <div className="space-y-2">
                  {Array.from({ length: selected.projects }, (_, i) => (
                    <div key={i} className="rounded-lg border border-slate-100 p-3">
                      <p className="text-[13px] font-semibold text-navy-900">
                        {['Classic Folding Doors — main terrace', 'Renson Pergola — garden lounge', 'Slim Sliding Doors — pool wing', 'Windows & Insect Screens — full replacement'][i % 4]}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Completed {['Mar 2026', 'Nov 2025', 'Jun 2025', 'Feb 2025'][i % 4]} · {fmtAEDShort(Math.round(selected.lifetimeValue / selected.projects))} · Team {((selected.id + i) % 18) + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-400"><MessageSquare size={13} /> Recent Communications</h3>
                <div className="space-y-2">
                  {[
                    ['WhatsApp', 'Confirmed maintenance visit window for next week.', selected.lastInteraction],
                    ['Email', 'Sent care instructions and warranty certificate PDF.', '2 weeks ago'],
                    ['Call', 'Post-installation satisfaction check — rated experience 5/5.', '1 month ago'],
                  ].map(([ch, txt, t], i) => (
                    <div key={i} className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[11px] font-bold text-navy-700">{ch} · <span className="font-normal text-slate-400">{t}</span></p>
                      <p className="mt-0.5 text-[13px] text-slate-600">{txt}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-400"><FileText size={13} /> Documents</h3>
                <div className="space-y-1.5">
                  {['Signed contract & BOQ.pdf', 'Lifetime Warranty certificate.pdf', 'Handover photo checklist (12 angles).zip', 'Care & maintenance guide.pdf'].map(d => (
                    <button key={d} className="flex w-full items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-left text-[13px] text-navy-800 transition hover:border-navy-200 hover:bg-navy-50/50">
                      <FileText size={13} className="text-slate-400" /> {d}
                    </button>
                  ))}
                </div>
              </section>
              {selected.warranty === 'Claim Open' && (
                <section className="rounded-xl border border-gold-200 bg-gold-50 p-4">
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-gold-700">Open Warranty Claim</h3>
                  <p className="mt-1 text-[13px] text-navy-800">Hinge tension adjustment requested — service visit scheduled. Lifetime Ownership Warranty: no charge.</p>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
