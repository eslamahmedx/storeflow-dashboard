import { useTheme } from '../../context/ThemeContext'

export default function KPICard({ label, value, change, up, icon: Icon, iconBg, iconColor }) {
  const { theme: t } = useTheme()

  const styles = {
    card: {
      background: t.card,
      border: `1px solid ${t.border}`,
      borderRadius: 14,
      padding: '18px 20px',
      transition: '0.2s ease',
    },
    label: {
      fontSize: 11,
      color: t.textSub,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    },
    value: {
      fontSize: 27,
      fontWeight: 800,
      color: t.text,
      margin: '6px 0 10px',
    }
  }

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = t.shadow
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 13 }}>
        <p style={styles.label}>{label}</p>

        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={18} color={iconColor} />
        </div>
      </div>

      <p style={styles.value}>{value}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Arrow up={up} color={up ? t.green : t.red} />
        <span style={{ fontSize: 12, fontWeight: 600, color: up ? t.green : t.red }}>
          {change}
        </span>
        <span style={{ fontSize: 12, color: t.textSub }}>
          vs last period
        </span>
      </div>
    </div>
  )
}

function Arrow({ up, color }) {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2}>
      {up ? (
        <polyline points="23 6 13 15 8 10 1 18" />
      ) : (
        <polyline points="23 18 13 8 8 13 1 6" />
      )}
    </svg>
  )
}