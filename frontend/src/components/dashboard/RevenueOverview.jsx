import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";

export default function RevenueOverview({ data }) {
  return (
    <div className="card">
      <div className="panel-head">
        <div>
          <h3>Revenue Overview</h3>
          <div className="sub">Gross revenue trend for the selected period</div>
        </div>
        <span className="chip">+12.4%</span>
      </div>

      <div style={{ width: "100%", height: 260, marginTop: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#EEF0F5" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#8A90A2" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8A90A2" }} axisLine={false} tickLine={false} width={44} />

            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #E7E9F0",
                fontSize: 12.5,
                fontFamily: "Inter",
              }}
              formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={2.4}
              fill="url(#rev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
