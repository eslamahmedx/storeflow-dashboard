import {
  ResponsiveContainer, AreaChart, Area, ComposedChart, Bar,
  LineChart, Line, BarChart, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import { useTheme } from '../../context/ThemeContext'

// ── Shared tooltip style ───────────────────────────────────────────
function useTooltipStyle() {
  const { theme: t } = useTheme()
  return {
    contentStyle: {
      background: t.card, border: `1px solid ${t.border2}`,
      borderRadius: 10, fontSize: 12, fontFamily: 'DM Sans, system-ui',
      boxShadow: t.shadow,
    },
    labelStyle: { color: t.text, fontWeight: 700, marginBottom: 4 },
    itemStyle: { color: t.textSub },
  }
}

const fmtRev = v => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`

// ── Revenue + Orders Combo Chart ───────────────────────────────────
export function RevenueChart({ data }) {
  const { theme: t } = useTheme()
  const tip = useTooltipStyle()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 5, right: 0, bottom: 0, left: -15 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={t.blue} stopOpacity={0.25} />
            <stop offset="100%" stopColor={t.blue} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
        <XAxis dataKey="l" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="rev" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtRev} />
        <YAxis yAxisId="ord" orientation="right" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          {...tip}
          formatter={(v, n) => n === 'rev' ? ['$' + v.toLocaleString(), 'Revenue'] : [v + ' orders', 'Orders']}
        />
        <Area yAxisId="rev" type="monotone" dataKey="rev" stroke={t.blue} strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: t.blue, strokeWidth: 0 }} />
        <Bar yAxisId="ord" dataKey="ord" fill={t.purpleBg} radius={[4, 4, 0, 0]} opacity={0.9} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

// ── Category Donut Chart ───────────────────────────────────────────
export function CategoryChart({ data }) {
  const tip = useTooltipStyle()
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={64} dataKey="val" paddingAngle={4} strokeWidth={0}>
          {data.map((c, i) => <Cell key={i} fill={c.color} />)}
        </Pie>
        <Tooltip {...tip} formatter={v => [v + '%', 'Share']} />
      </PieChart>
    </ResponsiveContainer>
  )
}

// ── Horizontal Bar: Top Products ───────────────────────────────────
export function TopProductsChart({ data }) {
  const { theme: t } = useTheme()
  const tip = useTooltipStyle()
  const COLORS = [t.blue, t.purple, t.teal, t.amber, t.rose]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} horizontal={false} />
        <XAxis type="number" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fill: t.textSub, fontSize: 12 }} axisLine={false} tickLine={false} width={58} />
        <Tooltip {...tip} formatter={v => [v + ' units', 'Sales']} />
        <Bar dataKey="sales" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Revenue Bar Chart ──────────────────────────────────────────────
export function RevenueBarChart({ data }) {
  const { theme: t } = useTheme()
  const tip = useTooltipStyle()
  const COLORS = [t.blue, t.purple, t.teal, t.amber, t.rose, t.cyan, t.green, t.red]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
        <XAxis dataKey="name" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip {...tip} formatter={v => ['$' + v.toLocaleString(), 'Revenue']} />
        <Bar dataKey="rev" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── Dual-Line: Revenue vs Visitors ────────────────────────────────
export function DualLineChart({ data }) {
  const { theme: t } = useTheme()
  const tip = useTooltipStyle()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
        <XAxis dataKey="l" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="a" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
        <YAxis yAxisId="b" orientation="right" tick={{ fill: t.textSub, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + 'k'} />
        <Tooltip {...tip} />
        <Line yAxisId="a" type="monotone" dataKey="rev" stroke={t.blue} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: t.blue, strokeWidth: 0 }} name="Revenue" />
        <Line yAxisId="b" type="monotone" dataKey="vis" stroke={t.teal} strokeWidth={2.5} dot={false} strokeDasharray="5 3" activeDot={{ r: 5, fill: t.teal, strokeWidth: 0 }} name="Visitors" />
      </LineChart>
    </ResponsiveContainer>
  )
}

// ── Traffic Sources Donut ──────────────────────────────────────────
export function TrafficChart({ data }) {
  const tip = useTooltipStyle()
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="val" paddingAngle={3} strokeWidth={0}>
          {data.map((c, i) => <Cell key={i} fill={c.color} />)}
        </Pie>
        <Tooltip {...tip} formatter={v => [v + '%', 'Share']} />
      </PieChart>
    </ResponsiveContainer>
  )
}
