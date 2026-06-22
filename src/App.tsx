import { useEffect, useState } from 'react'
import { Layout, type PageId } from './components/Layout'
import { Copilot } from './components/Copilot'
import { CommandCenter } from './pages/CommandCenter'
import { Pipeline } from './pages/Pipeline'
import { Leads } from './pages/Leads'
import { Quotes } from './pages/Quotes'
import { Installs } from './pages/Installs'
import { Performance } from './pages/Performance'
import { CalendarPage } from './pages/CalendarPage'
import { Clients } from './pages/Clients'
import { Care } from './pages/Care'
import { Kaizen } from './pages/Kaizen'
import { Messaging } from './pages/Messaging'
import { SettingsPage } from './pages/SettingsPage'

const PAGES: Record<PageId, () => React.JSX.Element> = {
  command: CommandCenter, pipeline: Pipeline, leads: Leads, quotes: Quotes,
  installs: Installs, performance: Performance, calendar: CalendarPage,
  clients: Clients, care: Care, kaizen: Kaizen, messaging: Messaging, settings: SettingsPage,
}

function PageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="skeleton h-16 rounded-xl" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-28 rounded-xl" />)}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="skeleton h-80 rounded-xl xl:col-span-2" />
        <div className="skeleton h-80 rounded-xl" />
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<PageId>('command')
  const [loading, setLoading] = useState(true)

  // brief skeleton on navigation — makes the demo feel like real data loading
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [page])

  const Page = PAGES[page]
  return (
    <Layout page={page} onNavigate={setPage}>
      {loading ? <PageSkeleton /> : <div className="animate-fade-up"><Page /></div>}
      <Copilot />
    </Layout>
  )
}
