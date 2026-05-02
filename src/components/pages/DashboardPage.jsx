import { useState } from 'react'
import { DollarSign, ShoppingCart, Users, Zap } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import KPICard from '../ui/KPICard'
import { Card, PeriodToggle } from '../ui/index'
import { RevenueChart, CategoryChart, TopProductsChart } from '../charts/index'
import { SALES, CATEGORIES, PRODUCTS, INSIGHTS } from '../../data/mockData'

export default function DashboardPage() {
  const { theme: t } = useTheme()
  const [period, setPeriod] = useState('weekly')
  const data = SALES[period]

  
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: t.text, margin: '0 0 3px', letterSpacing: '-0.03em' }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: t.textSub, margin: 0 }}>Saturday, May 2, 2026 · Welcome back, Eslam A. 👋</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.green, display: 'inline-block' }} />
          <span style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>All systems operational</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 16 }}>
        <KPICard label="Total Revenue" value="$173,420" change="+12.5%" up icon={DollarSign} iconBg={t.blueBg} iconColor={t.blue} />
        <KPICard label="Total Orders"  value="1,557"    change="+8.2%"  up icon={ShoppingCart} iconBg={t.purpleBg} iconColor={t.purple} />
        <KPICard label="Customers"     value="9,841"    change="+5.1%"  up icon={Users} iconBg={t.tealBg} iconColor={t.teal} />
        <KPICard label="Conversion"    value="3.24%"    change="-0.3%"  up={false} icon={Zap} iconBg={t.amberBg} iconColor={t.amber} />
      </div>

      {/* Revenue chart */}
      <Card style={{ padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 2px' }}>Revenue & Orders</h3>
            <p style={{ fontSize: 12, color: t.textSub, margin: 0 }}>Combined performance over time</p>
          </div>
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>
        <div style={{ height: 210 }}>
          <RevenueChart data={data} />
        </div>
      </Card>

      {/* Category + Insights row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Category Donut */}
        <Card style={{ padding: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 3px' }}>Sales by Category</h3>
          <p style={{ fontSize: 12, color: t.textSub, margin: '0 0 12px' }}>Revenue share this period</p>
          <div style={{ height: 140 }}>
            <CategoryChart data={CATEGORIES} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10 }}>
            {CATEGORIES.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: t.textSub }}>{c.name}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: t.text }}>{c.val}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Smart Insights */}
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: t.amberBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={15} color={t.amber} fill={t.amber} />
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: 0 }}>Smart Insights</h3>
              <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>AI-powered recommendations</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {INSIGHTS.map((ins, i) => {
              const cm = {
                success: { bg: t.greenBg, c: t.greenText },
                warning: { bg: t.amberBg, c: t.amberText },
                info:    { bg: t.blueBg,  c: t.blueText  },
              }[ins.type]
              return (
                <div key={i} style={{ padding: '8px 12px', borderRadius: 10, background: cm.bg }}>
                  <p style={{ margin: 0, fontSize: 11.5, color: cm.c, fontWeight: 700 }}>
                    {ins.title}:{' '}
                    <span style={{ fontWeight: 500 }}>{ins.body}</span>
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Top products bar */}
      <Card style={{ padding: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, margin: '0 0 2px' }}>Top Products by Units Sold</h3>
          <p style={{ fontSize: 12, color: t.textSub, margin: 0 }}>This month's best performers</p>
        </div>
        <div style={{ height: 180 }}>
          <TopProductsChart data={PRODUCTS} />
        </div>
      </Card>
    </div>
  )
}
