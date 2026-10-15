import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Dashboard from "../layouts/Dashboard";

import KpiCards from "../components/dashboard/KpiCards";
import RevenueOverview from "../components/dashboard/RevenueOverview";
import TopProducts from "../components/dashboard/TopProducts";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import { REVENUE_SERIES } from "../data/dashboardData";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [range, setRange] = useState("30D");

  const data = useMemo(
    () => REVENUE_SERIES[range],
    [range]
  );

  return (
    <Dashboard>
      {/* PAGE HEADER */}
      <div className="page-head">
        <div>
          <h1>Overview</h1>
          <p>
            Welcome back — here's what's
            happening with Nimbus today.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {/* RANGE */}
          <div className="range-toggle">
            {Object.keys(
              REVENUE_SERIES
            ).map((r) => (
              <button
                key={r}
                className={
                  r === range
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setRange(r)
                }
              >
                {r}
              </button>
            ))}
          </div>

          {/* NEW REPORT */}
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => navigate("/Users/Create")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* KPI */}
      <KpiCards />

      {/* PANELS */}
      <div className="panels">
        <RevenueOverview data={data} />
        <TopProducts />
      </div>

      {/* RECENT TRANSACTIONS */}
      <RecentTransactions />
    </Dashboard>
  );
}