import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { NOTIFICATIONS } from '../../data/mockData'

export default function Navbar({ onMenuClick, search, setSearch }) {
  const { theme: t, isDark, setIsDark } = useTheme()
  const [showNotifs, setShowNotifs] = useState(false)

  return (
    <header style={{
      background: t.navbarBg, borderBottom: `1px solid ${t.border}`,
      padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12,
      height: 58, flexShrink: 0, position: 'relative', zIndex: 30,
    }}>
      {/* Hamburger */}
      <button onClick={onMenuClick} style={iconBtnStyle(t)}>
        <MenuIcon color={t.textSub} />
      </button>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 280, flex: 1 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <SearchIcon color={t.textSub} />
        </span>
        <input
          placeholder="Search anything…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '7px 12px 7px 34px', borderRadius: 9,
            border: `1px solid ${t.border}`, background: t.inp,
            color: t.text, fontSize: 12, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifs(v => !v)}
            style={{
              ...iconBtnStyle(t),
              background: showNotifs ? t.active : t.inp,
              border: `1px solid ${showNotifs ? t.border2 : t.border}`,
              position: 'relative',
            }}
          >
            <BellIcon color={showNotifs ? t.activeText : t.textSub} />
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 7, height: 7,
              borderRadius: '50%', background: t.rose,
              border: `2px solid ${t.navbarBg}`,
              animation: 'pulse 2s infinite',
            }} />
          </button>

          {showNotifs && (
            <NotifPanel t={t} onClose={() => setShowNotifs(false)} />
          )}
        </div>

        {/* Dark / Light toggle */}
        <button onClick={() => setIsDark(v => !v)} style={iconBtnStyle(t)}>
          {isDark ? <SunIcon color={t.textSub} /> : <MoonIcon color={t.textSub} />}
        </button>

        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: t.accentGrad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: 12, cursor: 'pointer', flexShrink: 0,
        }}>
          EA
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}`}</style>
    </header>
  )
}

function NotifPanel({ t, onClose }) {
  return (
    <div style={{
      position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 316,
      background: t.card, border: `1px solid ${t.border2}`, borderRadius: 14,
      zIndex: 100, overflow: 'hidden', boxShadow: t.shadow,
      animation: 'scaleIn 0.2s ease',
    }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: t.text }}>Notifications</span>
        <span style={{ background: t.redBg, color: t.redText, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
          {NOTIFICATIONS.length} new
        </span>
      </div>

      {NOTIFICATIONS.map((n, i) => (
        <div
          key={n.id}
          style={{
            padding: '11px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer',
            borderBottom: i < NOTIFICATIONS.length - 1 ? `1px solid ${t.border}` : 'none',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = t.hover}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: n.type === 'order' ? t.blueBg : t.amberBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {n.type === 'order'
              ? <CartIcon color={t.blue} />
              : <WarnIcon color={t.amber} />}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: t.text, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</p>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: t.textSub }}>{n.sub}</span>
              <span style={{ width: 2, height: 2, borderRadius: '50%', background: t.textSub, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: t.textSub }}>{n.time} ago</span>
            </div>
          </div>
        </div>
      ))}

      <div style={{ padding: '10px 16px', borderTop: `1px solid ${t.border}`, textAlign: 'center' }}>
        <button style={{ fontSize: 12, color: t.blueText, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          View all notifications
        </button>
      </div>
    </div>
  )
}

// ── Styles & Icons ─────────────────────────────────────────────────
const iconBtnStyle = t => ({
  width: 34, height: 34, borderRadius: 9, border: `1px solid ${t.border}`,
  background: t.inp, cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
})

const MenuIcon = ({ color }) => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round"><line x1={3} y1={6} x2={21} y2={6}/><line x1={3} y1={12} x2={16} y2={12}/><line x1={3} y1={18} x2={21} y2={18}/></svg>
const SearchIcon = ({ color }) => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8}/><line x1={21} y1={21} x2={16.65} y2={16.65}/></svg>
const BellIcon = ({ color }) => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
const SunIcon = ({ color }) => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={5}/><line x1={12} y1={1} x2={12} y2={3}/><line x1={12} y1={21} x2={12} y2={23}/><line x1={4.22} y1={4.22} x2={5.64} y2={5.64}/><line x1={18.36} y1={18.36} x2={19.78} y2={19.78}/><line x1={1} y1={12} x2={3} y2={12}/><line x1={21} y1={12} x2={23} y2={12}/><line x1={4.22} y1={19.78} x2={5.64} y2={18.36}/><line x1={18.36} y1={5.64} x2={19.78} y2={4.22}/></svg>
const MoonIcon = ({ color }) => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
const CartIcon = ({ color }) => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx={9} cy={21} r={1}/><circle cx={20} cy={21} r={1}/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
const WarnIcon = ({ color }) => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1={12} y1={9} x2={12} y2={13}/><line x1={12} y1={17} x2="12.01" y2={17}/></svg>
