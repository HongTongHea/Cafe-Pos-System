import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import { KPIS } from "../../data/dashboardData";

const ICONS = {
  revenue: "DollarSign",
  users: "Users",
  orders: "Package",
  conv: "Activity",
};

import { DollarSign, Users, Package, Activity } from "lucide-react";

const iconMap = { DollarSign, Users, Package, Activity };

export default function KpiCards() {
  return (
    <div className="kpi-grid">
      {KPIS.map((k) => {
        const Icon = iconMap[ICONS[k.key]];

        return (
          <div className="card" key={k.key}>
            <div className="kpi-top">
              <div className="kpi-icon"><Icon /></div>

              <div className="kpi-spark">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={k.spark}>
                    <Bar
                      dataKey="v"
                      fill={k.up ? "#A5B4FC" : "#FCA5A5"}
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value mono">{k.value}</div>

            <div className="kpi-bottom">
              <div className={`kpi-delta ${k.up ? "up" : "down"}`}>
                {k.up ? <ArrowUpRight /> : <ArrowDownRight />}
                {k.delta}%
              </div>
              <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                vs last period
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
