import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";
import "../styles/datatable.css";

export default function Dashboard({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] =
        useState(false);

    return (
        <div
            className={`main-content ${sidebarCollapsed
                ? "sidebar-collapsed"
                : ""
                }`}
        >
            {/* SIDEBAR */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() =>
                    setSidebarCollapsed(
                        (prev) => !prev
                    )
                }
            />

            {/* MAIN */}
            <div className="main">
                {/* TOPBAR */}
                <Topbar />

                {/* PAGE CONTENT */}
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
}