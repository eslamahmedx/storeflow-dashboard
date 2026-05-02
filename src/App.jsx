import { useState, useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import DashboardPage from './components/pages/DashboardPage'
import OrdersPage from './components/pages/OrdersPage'
import { ProductsPage, CustomersPage, AnalyticsPage, SettingsPage } from './components/pages/OtherPages'

const PAGES = {
  Dashboard: DashboardPage,
  Orders: OrdersPage,
  Products: ProductsPage,
  Customers: CustomersPage,
  Analytics: AnalyticsPage,
  Settings: SettingsPage,
}

function AppShell() {
  const { theme: t } = useTheme()
  const [nav, setNav] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const ActivePage = PAGES[nav] || DashboardPage

  // Keep body bg in sync with theme
  useEffect(() => {
    document.body.style.background = t.bg
  }, [t.bg])

  return (
    <div style={{ display: 'flex', height: '100vh', background: t.bg, color: t.text, overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar nav={nav} setNav={setNav} open={sidebarOpen} />

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <Navbar
          onMenuClick={() => setSidebarOpen(v => !v)}
          search={search}
          setSearch={setSearch}
        />
        

        {/* Page */}
        <main
          key={nav}
          style={{ flex: 1, overflowY: 'auto', padding: '22px 22px 48px' }}
        >
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            {/* Breadcrumb for non-root pages */}
            {nav !== 'Dashboard' && nav !== 'Settings' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
                <span
                  style={{ fontSize: 12, color: t.textSub, cursor: 'pointer' }}
                  onClick={() => setNav('Dashboard')}
                >
                  Dashboard
                </span>
                <span style={{ fontSize: 12, color: t.textSub }}>/</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{nav}</span>
              </div>
            )}
            <ActivePage />
          </div>
        </main>
      </div>


      {/* Page-transition animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        main > div > * {
          animation: fadeUp 0.28s ease both;
        }
      `}</style>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
