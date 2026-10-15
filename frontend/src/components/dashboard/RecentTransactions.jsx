import { MoreHorizontal } from "lucide-react";
import { TRANSACTIONS, statusStyle } from "../../data/dashboardData";
import DataTable from "../ui/DataTable";


export default function RecentTransactions() {
  const renderRow = (t) => {
    const initials = t.customer.split(" ").map((n) => n[0]).join("");
    const st = statusStyle[t.status];

    return (
      <tr key={t.email}>
        <td>
          <div className="cust">
            <div className="avatar">{initials}</div>
            <div>
              <div style={{ fontWeight: 600 }}>{t.customer}</div>
              <div className="email">{t.email}</div>
            </div>
          </div>
        </td>
        <td>{t.product}</td>
        <td style={{ color: "var(--muted)" }}>{t.date}</td>
        <td className="text-start amount">{t.amount}</td>
        <td>
          <span className="badge" style={{ background: st.bg, color: st.fg }}>
            {t.status}
          </span>
        </td>
        <td className="row-more">
          <MoreHorizontal size={16} />
        </td>
      </tr>
    );
  };

  return (
    <div className="card">
      <div className="panel-head">
        <div>
          <h3>Recent Transactions</h3>
          <div className="sub">Latest payments across all customers</div>
        </div>
        <span className="chip" style={{ background: "var(--bg)", color: "var(--ink-soft)" }}>
          {TRANSACTIONS.length} this week
        </span>
      </div>

      <DataTable
        columns={["Customer", "Product", "Date", "Amount", "Status", ""]}
        data={TRANSACTIONS}
        renderRow={renderRow}
        pageLength={10}
        searchPlaceholder="Search transactions..."
        nonSortableColumns={[5]}
      />
    </div>
  );
}