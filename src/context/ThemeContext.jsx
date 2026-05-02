import { createContext, useContext, useState, useMemo } from 'react'

const dark = {
  bg: '#07090f', sidebar: '#0b0e19', card: '#0f1322', card2: '#131729',
  border: 'rgba(255,255,255,0.07)', border2: 'rgba(255,255,255,0.12)',
  text: '#e4eaf5', textSub: '#5e6e94', textMuted: '#3a4460',
  hover: 'rgba(255,255,255,0.04)', active: 'rgba(99,102,241,0.15)', activeText: '#818cf8',
  inp: 'rgba(255,255,255,0.04)', grid: 'rgba(255,255,255,0.04)',
  green: '#22c55e', greenBg: 'rgba(34,197,94,0.12)', greenText: '#86efac',
  red: '#ef4444', redBg: 'rgba(239,68,68,0.12)', redText: '#fca5a5',
  amber: '#f59e0b', amberBg: 'rgba(245,158,11,0.12)', amberText: '#fcd34d',
  blue: '#6366f1', blueBg: 'rgba(99,102,241,0.15)', blueText: '#a5b4fc',
  cyan: '#06b6d4', cyanBg: 'rgba(6,182,212,0.12)', cyanText: '#67e8f9',
  purple: '#a855f7', purpleBg: 'rgba(168,85,247,0.12)', purpleText: '#d8b4fe',
  rose: '#f43f5e', roseBg: 'rgba(244,63,94,0.12)', roseText: '#fda4af',
  teal: '#14b8a6', tealBg: 'rgba(20,184,166,0.12)', tealText: '#5eead4',
  accentGrad: 'linear-gradient(135deg,#6366f1,#a855f7)',
  navbarBg: '#0b0e19', shadow: '0 4px 24px rgba(0,0,0,0.5)',
}

const light = {
  bg: '#f0f2f8', sidebar: '#ffffff', card: '#ffffff', card2: '#f8f9fc',
  border: 'rgba(0,0,0,0.08)', border2: 'rgba(0,0,0,0.15)',
  text: '#0f172a', textSub: '#64748b', textMuted: '#94a3b8',
  hover: 'rgba(0,0,0,0.04)', active: '#eef2ff', activeText: '#4f46e5',
  inp: '#f1f5f9', grid: 'rgba(0,0,0,0.05)',
  green: '#16a34a', greenBg: '#dcfce7', greenText: '#15803d',
  red: '#dc2626', redBg: '#fee2e2', redText: '#991b1b',
  amber: '#d97706', amberBg: '#fef3c7', amberText: '#92400e',
  blue: '#4f46e5', blueBg: '#eef2ff', blueText: '#3730a3',
  cyan: '#0891b2', cyanBg: '#cffafe', cyanText: '#0e7490',
  purple: '#9333ea', purpleBg: '#faf5ff', purpleText: '#6b21a8',
  rose: '#e11d48', roseBg: '#fff1f2', roseText: '#9f1239',
  teal: '#0d9488', tealBg: '#f0fdfa', tealText: '#0f766e',
  accentGrad: 'linear-gradient(135deg,#4f46e5,#9333ea)',
  navbarBg: '#ffffff', shadow: '0 4px 24px rgba(0,0,0,0.08)',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true)
  const theme = useMemo(() => (isDark ? dark : light), [isDark])
  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
