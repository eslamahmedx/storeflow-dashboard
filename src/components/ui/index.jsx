import { useTheme } from '../../context/ThemeContext'

// ── Avatar ─────────────────────────────────────────────────────────
export function Avatar({ initials, size = 32 }) {
  const palette = ['#6366f1','#a855f7','#14b8a6','#f59e0b','#f43f5e','#06b6d4']
  const bg = palette[initials.charCodeAt(0) % palette.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700, fontSize: size * 0.35, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────────────
export function Badge({ status }) {
  const { theme: t } = useTheme()
  const map = {
    Delivered: { bg: t.greenBg,  c: t.greenText,  dot: t.green  },
    Shipped:   { bg: t.blueBg,   c: t.blueText,   dot: t.blue   },
    Pending:   { bg: t.amberBg,  c: t.amberText,  dot: t.amber  },
    Cancelled: { bg: t.redBg,    c: t.redText,    dot: t.red    },
    VIP:       { bg: t.purpleBg, c: t.purpleText, dot: t.purple },
    Regular:   { bg: t.cyanBg,   c: t.cyanText,   dot: t.cyan   },
    New:       { bg: t.greenBg,  c: t.greenText,  dot: t.green  },
  }
  const m = map[status] || { bg: t.inp, c: t.textSub, dot: t.textSub }
  return (
    <span style={{
      background: m.bg, color: m.c, padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center',
      gap: 5, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: m.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}

// ── Card ───────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '' }) {
  const { theme: t } = useTheme()
  return (
    <div className={className} style={{
      background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, ...style,
    }}>
      {children}
    </div>
  )
}

// ── SectionHeader ──────────────────────────────────────────────────
export function SectionHeader({ title, sub, action }) {
  const { theme: t } = useTheme()
  return (
    <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.02em' }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>{sub}</p>}
      </div>
      {action}
    </div>
  )
}

// ── PeriodToggle ───────────────────────────────────────────────────
export function PeriodToggle({ value, onChange }) {
  const { theme: t } = useTheme()
  return (
    <div style={{ display: 'flex', gap: 3, background: t.inp, borderRadius: 9, padding: 3 }}>
      {['daily','weekly','monthly'].map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            padding: '4px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 700, fontFamily: 'inherit', textTransform: 'capitalize',
            background: value === p ? t.blue : 'transparent',
            color: value === p ? '#fff' : t.textSub,
            transition: 'all 0.15s',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  )
}

// ── Toggle Switch ──────────────────────────────────────────────────
export function ToggleSwitch({ on, onToggle }) {
  const { theme: t } = useTheme()
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44, height: 24, borderRadius: 12, padding: 2, cursor: 'pointer', border: 'none',
        background: on ? t.blue : t.inp,
        display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
        transition: 'all 0.25s',
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  )
}

// ── StatMini ───────────────────────────────────────────────────────
export function StatMini({ label, value, color }) {
  const { theme: t } = useTheme()
  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: '14px 16px' }}>
      <p style={{ fontSize: 11, color: t.textSub, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px' }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 800, color: color || t.text, margin: 0 }}>{value}</p>
    </div>
  )
}

// ── Breadcrumb ─────────────────────────────────────────────────────
export function Breadcrumb({ items }) {
  const { theme: t } = useTheme()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ fontSize: 12, color: t.textSub }}>/</span>}
          <span
            onClick={item.onClick}
            style={{
              fontSize: 12,
              color: i === items.length - 1 ? t.text : t.textSub,
              fontWeight: i === items.length - 1 ? 700 : 400,
              cursor: item.onClick ? 'pointer' : 'default',
            }}
          >
            {item.label}
          </span>
        </span>
      ))}
    </div>
  )
}

// ── EmptyState ─────────────────────────────────────────────────────
export function EmptyState({ message = 'No results found' }) {
  const { theme: t } = useTheme()
  return (
    <div style={{ padding: 40, textAlign: 'center', color: t.textSub, fontSize: 13 }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
      {message}
    </div>
  )
}

// ── TrendBadge ─────────────────────────────────────────────────────
export function TrendBadge({ value }) {
  const { theme: t } = useTheme()
  const up = value >= 0
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      color: up ? t.green : t.red, fontSize: 12, fontWeight: 700,
    }}>
      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        {up
          ? <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>
          : <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>}
      </svg>
      {up ? '+' : ''}{value}%
    </span>
  )
}
