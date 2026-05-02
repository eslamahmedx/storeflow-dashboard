import { useTheme } from '../../context/ThemeContext'

const NAV_ITEMS = [
  { name: 'Dashboard', icon: DashIcon },
  { name: 'Orders',    icon: OrderIcon },
  { name: 'Products',  icon: ProductIcon },
  { name: 'Customers', icon: CustomerIcon },
  { name: 'Analytics', icon: AnalyticsIcon },
  { name: 'Settings',  icon: SettingsIcon },
]

export default function Sidebar({ nav, setNav, open }) {
  const { theme: t } = useTheme()

  return (
    <aside style={{
      width: open ? 216 : 62, flexShrink: 0,
      background: t.sidebar, borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: '16px 13px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${t.border}`, minHeight: 58,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: t.accentGrad,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <LogoIcon />
        </div>
        {open && (
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.03em' }}>StoreFlow</p>
            <p style={{ fontSize: 10, color: t.textSub, margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}>Pro Plan</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ name, icon: Icon }) => {
          const active = nav === name
          return (
            <button
              key={name}
              onClick={() => setNav(name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                padding: '9px 10px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: active ? t.active : 'transparent',
                color: active ? t.activeText : t.textSub,
                fontWeight: active ? 700 : 500, fontSize: 13, fontFamily: 'inherit',
                textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden',
                justifyContent: open ? 'flex-start' : 'center',
                transition: 'all 0.15s',
              }}
              title={!open ? name : undefined}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>
                <Icon color={active ? t.activeText : t.textSub} />
              </span>
              {open && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '12px 8px', borderTop: `1px solid ${t.border}` }}>
        {open ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: t.hover }}>
            <UserAvatar />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: 0, whiteSpace: 'nowrap' }}>Eslam A.</p>
              <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>• Admin</p>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UserAvatar />
          </div>
        )}
      </div>
    </aside>
  )
}

function UserAvatar() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'linear-gradient(135deg,#6366f1,#a855f7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 800, fontSize: 12, flexShrink: 0,
    }}>
      AK
    </div>
  )
}

function LogoIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1={3} y1={6} x2={21} y2={6}/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )
}

function DashIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect width={7} height={9} x={3} y={3} rx={1.5}/><rect width={7} height={5} x={14} y={3} rx={1.5}/><rect width={7} height={9} x={14} y={12} rx={1.5}/><rect width={7} height={5} x={3} y={16} rx={1.5}/></svg>
}
function OrderIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx={9} cy={21} r={1}/><circle cx={20} cy={21} r={1}/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
}
function ProductIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1={12} y1={22.08} x2={12} y2={12}/></svg>
}
function CustomerIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx={9} cy={7} r={4}/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function AnalyticsIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={20} x2={18} y2={10}/><line x1={12} y1={20} x2={12} y2={4}/><line x1={6} y1={20} x2={6} y2={14}/></svg>
}
function SettingsIcon({ color = 'currentColor' }) {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3}/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}
