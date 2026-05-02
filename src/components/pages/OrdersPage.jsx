import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Card, Badge, Avatar, StatMini, EmptyState } from '../ui/index'
import { ORDERS } from '../../data/mockData'

const STATUS_FILTERS = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled']
const PER_PAGE = 7

export default function OrdersPage() {
  const { theme: t } = useTheme()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => ORDERS.filter(o => {
    const ms = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)
    const mf = filter === 'All' || o.status === filter
    return ms && mf
  }), [search, filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>Orders</h1>
        <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>{filtered.length} orders total</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 14 }}>
        <StatMini label="Total Orders" value={ORDERS.length} color={t.blue} />
        <StatMini label="Delivered"    value={ORDERS.filter(o => o.status === 'Delivered').length} color={t.green} />
        <StatMini label="Pending"      value={ORDERS.filter(o => o.status === 'Pending').length} color={t.amber} />
        <StatMini label="Cancelled"    value={ORDERS.filter(o => o.status === 'Cancelled').length} color={t.red} />
      </div>

      {/* Table */}
      <Card style={{ overflow: 'hidden' }}>
        {/* Filters */}
        <div style={{
          padding: '14px 18px', borderBottom: `1px solid ${t.border}`,
          display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 160 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <Search size={13} color={t.textSub} />
            </span>
            <input
              placeholder="Search orders or customers…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              style={{ width: '100%', padding: '7px 10px 7px 30px', borderRadius: 9, border: `1px solid ${t.border}`, background: t.inp, color: t.text, fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Status filters */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => { setFilter(s); setPage(1) }}
                style={{
                  padding: '5px 12px', borderRadius: 8, border: `1px solid ${filter === s ? t.blue : t.border}`,
                  background: filter === s ? t.blueBg : 'transparent',
                  color: filter === s ? t.blueText : t.textSub,
                  cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: 'inherit', transition: 'all 0.15s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr style={{ background: `${t.card2}` }}>
                {['Order', 'Customer', 'Product', 'Status', 'Items', 'Amount', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: t.textSub, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(o => (
                <tr
                  key={o.id}
                  style={{ borderTop: `1px solid ${t.border}`, cursor: 'pointer', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = t.hover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: t.blue }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <Avatar initials={o.avatar} size={30} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: t.text, margin: 0 }}>{o.customer}</p>
                        <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>{o.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: t.textSub }}>{o.product}</td>
                  <td style={{ padding: '12px 16px' }}><Badge status={o.status} /></td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: t.textSub }}>{o.items} items</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: t.text }}>${o.amount.toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: t.textSub }}>{o.date}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7}><EmptyState message="No orders match your search" /></td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: '12px 18px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: t.textSub }}>
            Showing {rows.length} of {filtered.length} orders
          </span>
          <Pagination page={page} total={totalPages} onChange={setPage} t={t} />
        </div>
      </Card>
    </div>
  )
}

function Pagination({ page, total, onChange, t }) {
  const btnBase = { padding: '5px 9px', borderRadius: 7, border: `1px solid ${t.border}`, background: t.inp, cursor: 'pointer', display: 'flex', alignItems: 'center', fontFamily: 'inherit' }
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      <button onClick={() => onChange(p => Math.max(1, p - 1))} disabled={page === 1} style={{ ...btnBase, color: page === 1 ? t.textSub : t.text, cursor: page === 1 ? 'default' : 'pointer' }}>
        <ChevLeft color={page === 1 ? t.textSub : t.text} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onChange(p)} style={{ ...btnBase, minWidth: 32, justifyContent: 'center', border: `1px solid ${page === p ? t.blue : t.border}`, background: page === p ? t.blue : t.inp, color: page === p ? 'white' : t.text, fontWeight: page === p ? 700 : 400, fontSize: 12 }}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(p => Math.min(total, p + 1))} disabled={page === total} style={{ ...btnBase, color: page === total ? t.textSub : t.text, cursor: page === total ? 'default' : 'pointer' }}>
        <ChevRight color={page === total ? t.textSub : t.text} />
      </button>
    </div>
  )
}

const ChevLeft  = ({ color }) => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
const ChevRight = ({ color }) => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
