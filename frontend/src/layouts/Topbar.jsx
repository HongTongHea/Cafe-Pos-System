import react, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <header className="topbar">
      {/* <div className="search px-6">
        <Search size={16} />
        <input placeholder="Search customers, orders, products…" />
      </div> */}

      <div className="topbar-right">
        <div className="icon-btn">
          <Bell size={17} />
          <span className="dot" />
        </div>

        <div className="topbar-profile">
          <div className="avatar">{getInitials(user?.name)}</div>
          <div>
            <div className="name">{user?.name || "Guest"}</div>
            <div className="email">{user?.email}</div>
          </div>
          <ChevronDown size={15} color="var(--muted)" />
        </div>
      </div>
    </header>
  );
}
