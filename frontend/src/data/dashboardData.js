export const REVENUE_SERIES = {
  "7D": [
    { label: "Mon", value: 4200 },
    { label: "Tue", value: 5100 },
    { label: "Wed", value: 4800 },
    { label: "Thu", value: 6300 },
    { label: "Fri", value: 7100 },
    { label: "Sat", value: 6600 },
    { label: "Sun", value: 7800 },
  ],
  "30D": Array.from({ length: 30 }, (_, i) => ({
    label: `${i + 1}`,
    value: Math.round(
      4000 + Math.sin(i / 3) * 1400 + i * 90 + Math.random() * 500,
    ),
  })),
  "90D": Array.from({ length: 12 }, (_, i) => ({
    label: `W${i + 1}`,
    value: Math.round(
      30000 + Math.sin(i / 2) * 6000 + i * 900 + Math.random() * 2000,
    ),
  })),
};

export const SPARK = {
  revenue: [3, 5, 4, 6, 5, 7, 8, 7, 9].map((v, i) => ({ i, v })),
  users: [8, 7, 9, 8, 10, 9, 11, 12, 12].map((v, i) => ({ i, v })),
  orders: [5, 6, 5, 4, 6, 7, 6, 8, 7].map((v, i) => ({ i, v })),
  conv: [4, 4, 5, 4, 3, 4, 5, 5, 6].map((v, i) => ({ i, v })),
};

export const KPIS = [
  {
    key: "revenue",
    label: "Total Revenue",
    value: "$84,230",
    delta: 12.4,
    up: true,
    spark: SPARK.revenue,
  },
  {
    key: "users",
    label: "Active Users",
    value: "12,847",
    delta: 8.1,
    up: true,
    spark: SPARK.users,
  },
  {
    key: "orders",
    label: "New Orders",
    value: "1,924",
    delta: 3.2,
    up: false,
    spark: SPARK.orders,
  },
  {
    key: "conv",
    label: "Conversion Rate",
    value: "4.62%",
    delta: 1.8,
    up: true,
    spark: SPARK.conv,
  },
];

export const TOP_PRODUCTS = [
  { name: "Nimbus Pro Plan", sales: 842, revenue: "$25,260", share: 78 },
  { name: "Nimbus Team Seats", sales: 611, revenue: "$18,330", share: 62 },
  { name: "API Add-on", sales: 389, revenue: "$9,725", share: 44 },
  { name: "Priority Support", sales: 213, revenue: "$6,390", share: 28 },
];

export const TRANSACTIONS = [
  {
    customer: "Elena Marsh",
    email: "elena@brightloop.io",
    product: "Pro Plan",
    date: "Aug 10, 2026",
    amount: "$299.00",
    status: "Paid",
  },
  {
    customer: "Devon Cole",
    email: "devon@cole-studio.com",
    product: "Team Seats (5)",
    date: "Aug 10, 2026",
    amount: "$1,245.00",
    status: "Paid",
  },
  {
    customer: "Priya Nandan",
    email: "priya@northgrid.co",
    product: "API Add-on",
    date: "Aug 9, 2026",
    amount: "$89.00",
    status: "Pending",
  },
  {
    customer: "Marcus Wei",
    email: "marcus@wei.dev",
    product: "Pro Plan",
    date: "Aug 9, 2026",
    amount: "$299.00",
    status: "Failed",
  },
  {
    customer: "Sofia Reyes",
    email: "sofia@reyesco.com",
    product: "Priority Support",
    date: "Aug 8, 2026",
    amount: "$149.00",
    status: "Paid",
  },
  {
    customer: "Jonah Kirk",
    email: "jonah@kirkmedia.tv",
    product: "Team Seats (12)",
    date: "Aug 8, 2026",
    amount: "$2,988.00",
    status: "Paid",
  },
];

export const statusStyle = {
  Paid: { bg: "rgba(16,185,129,0.12)", fg: "#0D9668" },
  Pending: { bg: "rgba(245,158,11,0.14)", fg: "#B45309" },
  Failed: { bg: "rgba(239,68,68,0.12)", fg: "#DC2626" },
};
