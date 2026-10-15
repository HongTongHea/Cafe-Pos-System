import { MoreHorizontal } from "lucide-react";
import { TOP_PRODUCTS } from "../../data/dashboardData";

export default function TopProducts() {
  return (
    <div className="card">
      <div className="panel-head">
        <div>
          <h3>Top Products</h3>
          <div className="sub">By revenue this period</div>
        </div>
        <MoreHorizontal size={17} color="var(--muted)" className="row-more" />
      </div>

      <div style={{ marginTop: 6 }}>
        {TOP_PRODUCTS.map((p) => (
          <div className="product-row" key={p.name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="product-name">{p.name}</div>
                <div className="product-meta">{p.sales} sales</div>
              </div>
              <div className="product-revenue mono">{p.revenue}</div>
            </div>

            <div className="product-bar">
              <div style={{ width: `${p.share}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
