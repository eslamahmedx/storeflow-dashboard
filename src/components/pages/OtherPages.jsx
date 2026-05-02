// ────────────────────────────────────────────────────────────────────
//  ProductsPage
// ────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Card, StatMini, TrendBadge } from '../ui/index'
import { RevenueBarChart } from '../charts/index'
import { PRODUCTS } from '../../data/mockData'

export function ProductsPage() {
  const { theme: t } = useTheme()
  const [sortKey, setSortKey] = useState('sales')
  const sorted = [...PRODUCTS].sort((a, b) => b[sortKey] - a[sortKey])

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>Products</h1>
        <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>Inventory & performance overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 10, marginBottom: 14 }}>
        <StatMini label="Total Products" value={128} color={t.blue} />
        <StatMini label="In Stock"       value={112} color={t.green} />
        <StatMini label="Low Stock"      value={8}   color={t.amber} />
        <StatMini label="Out of Stock"   value={8}   color={t.red} />
      </div>

      <Card style={{ overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: 0 }}>Product Inventory</h3>
          <div style={{ display: 'flex', gap: 4 }}>
            {['sales', 'rev', 'stock'].map(k => (
              <button key={k} onClick={() => setSortKey(k)} style={{
                padding: '4px 10px', borderRadius: 7, border: `1px solid ${sortKey === k ? t.blue : t.border}`,
                background: sortKey === k ? t.blueBg : 'transparent', color: sortKey === k ? t.blueText : t.textSub,
                cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: 'inherit', textTransform: 'capitalize',
              }}>
                {k === 'rev' ? 'Revenue' : k === 'sales' ? 'Units' : 'Stock'}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: t.card2 }}>
              {['Product', 'Category', 'Units Sold', 'Revenue', 'Stock', 'Trend'].map(h => (
                <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${t.border}`, transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = t.hover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: t.blueBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BoxIcon color={t.blue} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>${p.price}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: t.textSub }}>{p.category}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: t.text }}>{p.sales}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: t.text }}>${p.rev.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    background: p.stock < 25 ? t.amberBg : t.greenBg,
                    color: p.stock < 25 ? t.amberText : t.greenText,
                    padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  }}>
                    {p.stock} units
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}><TrendBadge value={p.trend} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card style={{ padding: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 14px' }}>Revenue by Product</h3>
        <div style={{ height: 200 }}><RevenueBarChart data={sorted} /></div>
      </Card>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  CustomersPage
// ────────────────────────────────────────────────────────────────────
import { Avatar, Badge } from '../ui/index'
import { CUSTOMERS } from '../../data/mockData'

export function CustomersPage() {
  const { theme: t } = useTheme()
  const [search, setSearch] = useState('')
  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>Customers</h1>
        <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>Manage and analyse your customer base</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 14 }}>
        <StatMini label="Total"   value="9,841" color={t.blue} />
        <StatMini label="VIP"     value={3}     color={t.purple} />
        <StatMini label="New 30d" value={142}   color={t.green} />
        <StatMini label="Avg LTV" value="$621"  color={t.amber} />
      </div>

      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ position: 'relative', maxWidth: 280 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <SearchSm color={t.textSub} />
            </span>
            <input
              placeholder="Search customers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '7px 10px 7px 30px', borderRadius: 9, border: `1px solid ${t.border}`, background: t.inp, color: t.text, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: t.card2 }}>
              {['Customer', 'Orders', 'Total Spent', 'Joined', 'Country', 'Status'].map(h => (
                <th key={h} style={{ padding: '9px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${t.border}`, transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = t.hover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={c.avatar} size={32} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{c.name}</p>
                      <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>{c.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: t.text }}>{c.orders}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: t.text }}>${c.spent.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: t.textSub }}>{c.joined}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: t.textSub }}>{c.country}</td>
                <td style={{ padding: '12px 16px' }}><Badge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  AnalyticsPage
// ────────────────────────────────────────────────────────────────────
import { DualLineChart, TrafficChart } from '../charts/index'
import { PeriodToggle } from '../ui/index'
import { SALES, FUNNEL, TRAFFIC } from '../../data/mockData'

export function AnalyticsPage() {
  const { theme: t } = useTheme()
  const [period, setPeriod] = useState('weekly')
  const data = SALES[period]

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>Analytics</h1>
        <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>Deep dive into your store performance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Conversion Funnel */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>Conversion Funnel</h3>
          <p style={{ fontSize: 12, color: t.textSub, margin: '0 0 16px' }}>Visitor → Purchase journey</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FUNNEL.map((f, i) => {
              const pct = Math.round((f.value / FUNNEL[0].value) * 100)
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: t.textSub }}>{f.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{f.value.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 4, background: t.inp, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: pct + '%', background: f.fill, borderRadius: 4, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>Traffic Sources</h3>
          <p style={{ fontSize: 12, color: t.textSub, margin: '0 0 10px' }}>Where your visitors come from</p>
          <div style={{ height: 170 }}><TrafficChart data={TRAFFIC} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 14px' }}>
            {TRAFFIC.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: t.textSub }}>{c.name} {c.val}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Dual line chart */}
      <Card style={{ padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 2px' }}>Revenue vs Visitors</h3>
            <p style={{ fontSize: 12, color: t.textSub, margin: 0 }}>Correlation over time</p>
          </div>
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>
        <div style={{ height: 210 }}><DualLineChart data={data} /></div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 22, height: 3, borderRadius: 2, background: t.blue, display: 'block' }} />
            <span style={{ fontSize: 11, color: t.textSub }}>Revenue</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 22, height: 3, borderRadius: 2, background: t.teal, display: 'block', opacity: 0.7 }} />
            <span style={{ fontSize: 11, color: t.textSub }}>Visitors</span>
          </div>
        </div>
      </Card>

      {/* Metric tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
        {[
          { l: 'Avg Order Value', v: '$111.3', c: '+4.2%', up: true  },
          { l: 'Bounce Rate',     v: '38.2%',  c: '-2.1%', up: true  },
          { l: 'Session Duration',v: '4m 23s', c: '+12s',  up: true  },
          { l: 'Return Rate',     v: '28.4%',  c: '+1.8%', up: true  },
        ].map(m => (
          <div key={m.l} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px' }}>
            <p style={{ fontSize: 11, color: t.textSub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px' }}>{m.l}</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: t.text, margin: '0 0 4px' }}>{m.v}</p>
            <TrendBadge value={parseFloat(m.c)} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  SettingsPage
// ────────────────────────────────────────────────────────────────────
import { ToggleSwitch } from '../ui/index'
import { Save, Check, Moon, Sun } from 'lucide-react'

export function SettingsPage() {
  const { theme: t, isDark, setIsDark } = useTheme()
  const [name, setName]       = useState('Eslam Ahmed')
  const [email, setEmail]     = useState('eslam@storeflow.io')
  const [company, setCompany] = useState('StoreFlow Inc.')
  const [saved, setSaved]     = useState(false)
  const [notifs, setNotifs]   = useState({ orders: true, stock: true, reports: false, marketing: true })

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200) }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>Manage your account and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Profile card */}
        <Card style={{ padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 18px' }}>Profile</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 18, borderBottom: `1px solid ${t.border}` }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: t.accentGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
              AK
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>Eslam A.</p>
              <p style={{ fontSize: 12, color: t.textSub, margin: 0 }}>Administrator</p>
            </div>
          </div>

          {[['Full Name', name, setName], ['Email', email, setEmail], ['Company', company, setCompany]].map(([lbl, val, setter]) => (
            <div key={lbl} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 5 }}>{lbl}</label>
              <input value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 9, border: `1px solid ${t.border}`, background: t.inp, color: t.text, fontSize: 13, outline: 'none', boxSizing: 'border-box', transition: 'border 0.15s' }}
                onFocus={e => e.target.style.borderColor = t.blue}
                onBlur={e => e.target.style.borderColor = t.border} />
            </div>
          ))}

          <button
            onClick={save}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 9, border: 'none', background: saved ? t.green : t.blue, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.25s', fontFamily: 'inherit' }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </Card>

        {/* Preferences card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 14px' }}>Appearance</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 10, background: t.card2, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.blueBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDark ? <Moon size={14} color={t.blue} /> : <Sun size={14} color={t.blue} />}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</p>
                  <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>{isDark ? 'Easy on the eyes' : 'Bright and clean'}</p>
                </div>
              </div>
              <ToggleSwitch on={isDark} onToggle={() => setIsDark(v => !v)} />
            </div>
          </Card>

          <Card style={{ padding: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 14px' }}>Notifications</h3>
            {Object.entries(notifs).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${t.border}` }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: 0, textTransform: 'capitalize' }}>{k} notifications</p>
                  <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>{k === 'orders' ? 'New order alerts' : k === 'stock' ? 'Low stock warnings' : k === 'reports' ? 'Weekly reports' : 'Marketing emails'}</p>
                </div>
                <ToggleSwitch on={v} onToggle={() => setNotifs(p => ({ ...p, [k]: !p[k] }))} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

// Small search icon
const SearchSm = ({ color }) => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8}/><line x1={21} y1={21} x2={16.65} y2={16.65}/></svg>
const BoxIcon  = ({ color }) => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1={12} y1={22.08} x2={12} y2={12}/></svg>
