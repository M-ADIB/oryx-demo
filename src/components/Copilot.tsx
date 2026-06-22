import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, Send } from 'lucide-react'
import clsx from 'clsx'
import { COPILOT_QA } from '../data/mock'

interface ChatMsg { role: 'user' | 'ai'; text: string }

function renderAnswer(text: string) {
  // minimal markdown: **bold** and line breaks / bullets
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
      seg.startsWith('**') ? <strong key={j} className="font-semibold text-navy-900">{seg.slice(2, -2)}</strong> : seg
    )
    return <p key={i} className={clsx('leading-relaxed', line === '' && 'h-2')}>{parts}</p>
  })
}

export function Copilot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<ChatMsg[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, thinking])

  const ask = (q: string) => {
    if (!q.trim()) return
    setMsgs(m => [...m, { role: 'user', text: q }])
    setInput('')
    setThinking(true)
    const match = COPILOT_QA.find(x => x.q === q)
    const answer = match?.a ??
      'Based on current dashboard data: pipeline stands at AED 8.6M with AED 3.1M weighted to close this month. Top operational risk is Team 7\'s material delay (countermeasure active). Recommended next action: standardize Team 12\'s gasket-kit method across the fleet — estimated 1.5 hrs saved per job. Ask me one of the suggested questions for a deeper root-cause analysis.'
    setTimeout(() => {
      setThinking(false)
      setMsgs(m => [...m, { role: 'ai', text: answer }])
    }, 1100)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-13 items-center gap-2 rounded-full bg-navy-900 px-4 py-3.5 text-white shadow-[0_8px_24px_rgba(9,40,57,0.35)] transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(9,40,57,0.45)]"
      >
        <Sparkles size={18} className="text-gold-300" />
        <span className="text-sm font-semibold">Oryx Intelligence</span>
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-up">
          <div className="flex items-center justify-between bg-navy-900 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-700 text-gold-300"><Sparkles size={16} /></div>
              <div>
                <p className="text-sm font-bold text-white">Oryx Intelligence</p>
                <p className="flex items-center gap-1.5 text-[11px] text-navy-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-400 animate-pulse-dot" /> Connected to live operations data
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-navy-300 hover:text-white"><X size={18} /></button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <div>
                <p className="text-sm text-slate-600">Good afternoon, Guy. I'm watching the gemba in real time. Ask me anything about sales, operations, or waste — or start with one of these:</p>
                <div className="mt-3 space-y-2">
                  {COPILOT_QA.map(x => (
                    <button
                      key={x.q}
                      onClick={() => ask(x.q)}
                      className="block w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 text-left text-[13px] font-medium text-navy-800 transition hover:border-navy-300 hover:bg-navy-100"
                    >
                      {x.q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={clsx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={clsx(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px]',
                  m.role === 'user' ? 'bg-navy-900 text-white rounded-br-sm' : 'bg-slate-100 text-navy-800 rounded-bl-sm space-y-1',
                )}>
                  {m.role === 'ai' ? renderAnswer(m.text) : m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex items-center gap-2 text-[13px] text-slate-400">
                <Sparkles size={14} className="text-gold-500 animate-pulse-dot" /> Analysing operations data…
              </div>
            )}
            {msgs.length > 0 && !thinking && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COPILOT_QA.filter(x => !msgs.some(m => m.text === x.q)).slice(0, 2).map(x => (
                  <button key={x.q} onClick={() => ask(x.q)} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] text-slate-500 transition hover:border-navy-300 hover:text-navy-800">
                    {x.q}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={e => { e.preventDefault(); ask(input) }}
            className="flex items-center gap-2 border-t border-slate-100 p-3"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about your operations…"
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] outline-none focus:border-navy-300 focus:bg-white"
            />
            <button type="submit" className="rounded-lg bg-navy-900 p-2 text-white transition hover:bg-navy-700"><Send size={15} /></button>
          </form>
        </div>
      )}
    </>
  )
}
