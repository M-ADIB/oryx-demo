import { useState, type ReactNode } from 'react'
import clsx from 'clsx'
import {
  LayoutDashboard, KanbanSquare, Users, FileText, Wrench, Trophy, Calendar,
  Contact, HeartHandshake, Lightbulb, MessageSquare, Settings, Search, Bell,
  ChevronDown, Menu, X, LogOut, UserCircle, Shield,
} from 'lucide-react'
import { NOTIFICATIONS } from '../data/mock'

export type PageId =
  | 'command' | 'pipeline' | 'leads' | 'quotes' | 'installs' | 'performance'
  | 'calendar' | 'clients' | 'care' | 'kaizen' | 'messaging' | 'settings'

const NAV: { group: string; items: { id: PageId; label: string; icon: ReactNode }[] }[] = [
  { group: 'Overview', items: [
    { id: 'command', label: 'Command Center', icon: <LayoutDashboard size={17} /> },
  ]},
  { group: 'Sales & Marketing', items: [
    { id: 'pipeline', label: 'Sales Pipeline', icon: <KanbanSquare size={17} /> },
    { id: 'leads', label: 'Leads & Sources', icon: <Users size={17} /> },
    { id: 'quotes', label: 'Quotes & Billing', icon: <FileText size={17} /> },
  ]},
  { group: 'Operations', items: [
    { id: 'installs', label: 'Installation Tracker', icon: <Wrench size={17} /> },
    { id: 'performance', label: 'Team Performance', icon: <Trophy size={17} /> },
    { id: 'calendar', label: 'Appointment Calendar', icon: <Calendar size={17} /> },
  ]},
  { group: 'Customer', items: [
    { id: 'clients', label: 'Client List', icon: <Contact size={17} /> },
    { id: 'care', label: 'Customer Care', icon: <HeartHandshake size={17} /> },
  ]},
  { group: 'Company', items: [
    { id: 'kaizen', label: 'Kaizen Board', icon: <Lightbulb size={17} /> },
    { id: 'messaging', label: 'Messaging', icon: <MessageSquare size={17} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={17} /> },
  ]},
]

function OryxLogo() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-white font-black text-sm tracking-tight">O</div>
      <div>
        <span className="block text-lg font-black tracking-[0.18em] text-navy-900 leading-none">ORYX</span>
        <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400">Doors &amp; Windows</span>
      </div>
    </div>
  )
}

export function Layout({ page, onNavigate, children }: { page: PageId; onNavigate: (p: PageId) => void; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const unread = NOTIFICATIONS.filter(n => n.unread).length

  const sidebar = (
    <nav className="flex h-full flex-col">
      <div className="px-4 py-5"><OryxLogo /></div>
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map(group => (
          <div key={group.group} className="mb-4">
            <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{group.group}</p>
            {group.items.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false) }}
                className={clsx(
                  'mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors',
                  page === item.id
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-navy-50 hover:text-navy-900',
                )}
              >
                {item.icon}{item.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 p-3">
        <div className="rounded-lg bg-navy-50 p-3">
          <p className="text-[11px] font-bold text-navy-900">Digital Lean OS</p>
          <p className="mt-0.5 text-[11px] leading-snug text-slate-500">Continuous Improvement Score: <span className="font-bold text-sage-600">87 / 100</span></p>
        </div>
      </div>
    </nav>
  )

  return (
    <div className="flex h-full">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <button className="absolute right-3 top-4 text-slate-400" onClick={() => setMobileOpen(false)}><X size={18} /></button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
          <button className="text-slate-500 lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
          <div className="lg:hidden"><OryxLogo /></div>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search clients, quotes, jobs, teams…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-sm outline-none transition focus:border-navy-300 focus:bg-white focus:ring-2 focus:ring-navy-100"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
                className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-navy-900"
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-white">{unread}</span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 z-30 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-up">
                  <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</p>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-slate-50">
                      <span className={clsx('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.unread ? 'bg-gold-500' : 'bg-slate-200')} />
                      <div>
                        <p className="text-[13px] leading-snug text-navy-900">{n.text}</p>
                        <p className="text-[11px] text-slate-400">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-[11px] font-bold text-white">GD</div>
                <div className="hidden text-left sm:block">
                  <p className="text-[12px] font-semibold leading-tight text-navy-900">Guy Dawson</p>
                  <p className="text-[10px] leading-tight text-slate-400">Managing Director</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-fade-up">
                  {[
                    { icon: <UserCircle size={15} />, label: 'My Profile' },
                    { icon: <Shield size={15} />, label: 'Admin Console' },
                    { icon: <Settings size={15} />, label: 'Preferences' },
                    { icon: <LogOut size={15} />, label: 'Sign Out' },
                  ].map(i => (
                    <button key={i.label} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-navy-900">
                      {i.icon}{i.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6" onClick={() => { setNotifOpen(false); setProfileOpen(false) }}>
          {children}
        </main>
      </div>
    </div>
  )
}
