// ── Sales Time-Series ──────────────────────────────────────────────
export const SALES = {
  daily: [
    { l: 'Mon', rev: 4200, ord: 38, vis: 840 },
    { l: 'Tue', rev: 5800, ord: 52, vis: 1160 },
    { l: 'Wed', rev: 4900, ord: 44, vis: 980 },
    { l: 'Thu', rev: 7200, ord: 65, vis: 1440 },
    { l: 'Fri', rev: 8500, ord: 78, vis: 1700 },
    { l: 'Sat', rev: 9100, ord: 84, vis: 1820 },
    { l: 'Sun', rev: 6300, ord: 57, vis: 1260 },
  ],
  weekly: [
    { l: 'Wk 1', rev: 32000, ord: 289, vis: 6400 },
    { l: 'Wk 2', rev: 41000, ord: 371, vis: 8200 },
    { l: 'Wk 3', rev: 38000, ord: 342, vis: 7600 },
    { l: 'Wk 4', rev: 49000, ord: 441, vis: 9800 },
  ],
  monthly: [
    { l: 'Jan', rev: 125000, ord: 1120, vis: 25000 },
    { l: 'Feb', rev: 138000, ord: 1240, vis: 27600 },
    { l: 'Mar', rev: 112000, ord: 1008, vis: 22400 },
    { l: 'Apr', rev: 159000, ord: 1430, vis: 31800 },
    { l: 'May', rev: 147000, ord: 1320, vis: 29400 },
    { l: 'Jun', rev: 173000, ord: 1557, vis: 34600 },
  ],
}

// ── Category Distribution ──────────────────────────────────────────
export const CATEGORIES = [
  { name: 'Electronics', val: 38, color: '#6366f1' },
  { name: 'Clothing',    val: 24, color: '#a855f7' },
  { name: 'Home & Garden', val: 18, color: '#14b8a6' },
  { name: 'Sports',      val: 12, color: '#f59e0b' },
  { name: 'Beauty',      val:  8, color: '#f43f5e' },
]

// ── Top Products ───────────────────────────────────────────────────
export const PRODUCTS = [
  { id: 'P001', name: 'AirPods Pro',       category: 'Electronics', sales: 284, rev: 71000, stock: 48,  trend: 12,  price: 249 },
  { id: 'P002', name: 'iPhone Case',       category: 'Electronics', sales: 412, rev: 20600, stock: 203, trend:  8,  price: 49  },
  { id: 'P003', name: 'Smart Watch',       category: 'Electronics', sales: 198, rev: 59400, stock: 23,  trend: -3,  price: 299 },
  { id: 'P004', name: 'Laptop Stand',      category: 'Home & Garden', sales: 356, rev: 21360, stock: 87, trend: 5,  price: 59  },
  { id: 'P005', name: 'Wireless Charger',  category: 'Electronics', sales: 267, rev: 13350, stock: 12,  trend: -7,  price: 49  },
  { id: 'P006', name: 'Running Shoes',     category: 'Sports',      sales: 189, rev: 28350, stock: 64,  trend: 15,  price: 149 },
  { id: 'P007', name: 'Yoga Mat',          category: 'Sports',      sales: 223, rev: 11150, stock: 91,  trend:  9,  price: 49  },
  { id: 'P008', name: 'Face Serum',        category: 'Beauty',      sales: 341, rev: 17050, stock: 156, trend:  6,  price: 49  },
]

// ── Orders ─────────────────────────────────────────────────────────
export const ORDERS = [
  { id: '#8291', customer: 'Sarah Johnson',  email: 'sarah@email.com',  status: 'Delivered', amount: 248.50, date: 'Apr 28', items: 3, avatar: 'SJ', product: 'AirPods Pro'     },
  { id: '#8290', customer: 'Mike Chen',      email: 'mike@email.com',   status: 'Shipped',   amount: 124.00, date: 'Apr 28', items: 1, avatar: 'MC', product: 'iPhone Case'     },
  { id: '#8289', customer: 'Emma Wilson',    email: 'emma@email.com',   status: 'Pending',   amount:  89.99, date: 'Apr 27', items: 2, avatar: 'EW', product: 'Face Serum'      },
  { id: '#8288', customer: 'James Davis',    email: 'james@email.com',  status: 'Delivered', amount: 356.75, date: 'Apr 27', items: 4, avatar: 'JD', product: 'Smart Watch'     },
  { id: '#8287', customer: 'Aisha Patel',    email: 'aisha@email.com',  status: 'Shipped',   amount: 199.00, date: 'Apr 26', items: 2, avatar: 'AP', product: 'Running Shoes'   },
  { id: '#8286', customer: 'Carlos Ruiz',    email: 'carlos@email.com', status: 'Pending',   amount:  67.50, date: 'Apr 26', items: 1, avatar: 'CR', product: 'Yoga Mat'        },
  { id: '#8285', customer: 'Lisa Thompson',  email: 'lisa@email.com',   status: 'Delivered', amount: 432.00, date: 'Apr 25', items: 5, avatar: 'LT', product: 'Laptop Stand'    },
  { id: '#8284', customer: 'Raj Kumar',      email: 'raj@email.com',    status: 'Cancelled', amount: 145.00, date: 'Apr 25', items: 2, avatar: 'RK', product: 'Wireless Charger'},
  { id: '#8283', customer: 'Olivia Brown',   email: 'olivia@email.com', status: 'Shipped',   amount: 278.00, date: 'Apr 24', items: 3, avatar: 'OB', product: 'AirPods Pro'     },
  { id: '#8282', customer: 'Noah Martinez',  email: 'noah@email.com',   status: 'Delivered', amount:  93.25, date: 'Apr 24', items: 1, avatar: 'NM', product: 'Face Serum'      },
  { id: '#8281', customer: 'Yuki Tanaka',    email: 'yuki@email.com',   status: 'Pending',   amount: 512.00, date: 'Apr 23', items: 6, avatar: 'YT', product: 'Smart Watch'     },
  { id: '#8280', customer: 'Grace Lee',      email: 'grace@email.com',  status: 'Delivered', amount: 187.50, date: 'Apr 23', items: 2, avatar: 'GL', product: 'iPhone Case'     },
]

// ── Customers ──────────────────────────────────────────────────────
export const CUSTOMERS = [
  { name: 'Sarah Johnson', email: 'sarah@email.com',  orders: 14, spent: 2841, joined: 'Jan 2024', status: 'VIP',     avatar: 'SJ', country: 'US' },
  { name: 'Mike Chen',     email: 'mike@email.com',   orders:  8, spent: 1240, joined: 'Mar 2024', status: 'Regular', avatar: 'MC', country: 'CA' },
  { name: 'Emma Wilson',   email: 'emma@email.com',   orders: 21, spent: 4890, joined: 'Nov 2023', status: 'VIP',     avatar: 'EW', country: 'UK' },
  { name: 'James Davis',   email: 'james@email.com',  orders:  5, spent:  756, joined: 'Apr 2024', status: 'New',     avatar: 'JD', country: 'US' },
  { name: 'Aisha Patel',   email: 'aisha@email.com',  orders: 19, spent: 3670, joined: 'Dec 2023', status: 'VIP',     avatar: 'AP', country: 'IN' },
  { name: 'Carlos Ruiz',   email: 'carlos@email.com', orders:  3, spent:  412, joined: 'May 2024', status: 'New',     avatar: 'CR', country: 'MX' },
  { name: 'Lisa Thompson', email: 'lisa@email.com',   orders: 11, spent: 2100, joined: 'Feb 2024', status: 'Regular', avatar: 'LT', country: 'AU' },
  { name: 'Raj Kumar',     email: 'raj@email.com',    orders:  7, spent:  980, joined: 'Mar 2024', status: 'Regular', avatar: 'RK', country: 'IN' },
]

// ── Notifications ──────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'New order #8291', sub: 'Sarah Johnson · $248.50', time: '2m'  },
  { id: 2, type: 'stock', title: 'Low stock: Wireless Charger', sub: '12 units left', time: '15m' },
  { id: 3, type: 'order', title: 'New order #8290', sub: 'Mike Chen · $124.00', time: '28m'     },
  { id: 4, type: 'stock', title: 'Low stock: Smart Watch', sub: '23 units left', time: '1h'     },
  { id: 5, type: 'order', title: 'New order #8287', sub: 'Aisha Patel · $199.00', time: '2h'   },
]

// ── Smart Insights ─────────────────────────────────────────────────
export const INSIGHTS = [
  { type: 'success', title: 'Revenue surge',    body: 'Sales up 15% this week — best performance since Q1 launch.' },
  { type: 'info',    title: 'Top product',       body: 'AirPods Pro leads with 284 units sold this month.'         },
  { type: 'warning', title: 'Low stock alert',   body: 'Wireless Charger has only 12 units remaining.'             },
  { type: 'info',    title: 'Retention up',      body: 'Customer retention improved to 68% this month.'           },
  { type: 'warning', title: 'Reorder needed',    body: 'Smart Watch inventory is below reorder threshold (23u).'  },
  { type: 'success', title: 'CVR improved',      body: 'Conversion rate 3.24% — up 2.3% vs last period.'          },
]

// ── Funnel ─────────────────────────────────────────────────────────
export const FUNNEL = [
  { name: 'Visitors',      value: 34600, fill: '#6366f1' },
  { name: 'Product Views', value: 18200, fill: '#a855f7' },
  { name: 'Add to Cart',   value:  7400, fill: '#14b8a6' },
  { name: 'Checkout',      value:  3200, fill: '#f59e0b' },
  { name: 'Purchase',      value:  1557, fill: '#22c55e' },
]

// ── Traffic Sources ────────────────────────────────────────────────
export const TRAFFIC = [
  { name: 'Organic Search', val: 42, color: '#6366f1' },
  { name: 'Direct',         val: 28, color: '#a855f7' },
  { name: 'Social Media',   val: 18, color: '#14b8a6' },
  { name: 'Email',          val:  8, color: '#f59e0b' },
  { name: 'Referral',       val:  4, color: '#f43f5e' },
]
