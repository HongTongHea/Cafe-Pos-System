import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  PanelLeft,
} from "lucide-react";

const NAV = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/AdminDashboard",
  },
  {
    label: "Users",
    icon: Users,
    path: "/Users",
  },
  {
    label: "Settings",
    icon: Settings,
    // path: "/Settings",
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}) {
  const navigate = useNavigate();

  const [user] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error(
        "Failed to read user:",
        error
      );

      return null;
    }
  });

  const getInitials = (name) => {
    if (!name) return "";

    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""
        }`}
    >
      {/* Brand */}
      <div className="brand">

        <div className="brand-mark">
          ⚙️
        </div>

        {!collapsed && (
          <div className="brand-name">
            ShopAdmin
          </div>
        )}

      </div>

      {/* Sidebar Toggle */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
      >
        <PanelLeft size={18} />
      </button>

      {/* Navigation */}
      <div>
        {!collapsed && (
          <div className="nav-label">
            Menu
          </div>
        )}
        <nav className="nav">
          {NAV.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(
                item.path + "/"
              );

            return (
              <button
                key={item.label}
                type="button"
                className={`nav-item ${isActive ? "active" : ""
                  }`}
                title={
                  collapsed
                    ? item.label
                    : undefined
                }
                onClick={() =>
                  navigate(item.path)
                }
              >
                <Icon />

                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
      {/* Sidebar Bottom */}
      <div className="sidebar-bottom">

        {/* Help */}
        <button
          type="button"
          className="nav-item"
          title={
            collapsed
              ? "Help & Support"
              : undefined
          }
        >
          <HelpCircle />

          {!collapsed && (
            <span>
              Help &amp; Support
            </span>
          )}
        </button>

        <div className="sidebar-divider" />

        {/* User */}
        <div className="sidebar-user">

          <div className="avatar">
            {getInitials(user?.name)}
          </div>

          {!collapsed && (
            <div>
              <div className="name">
                {user?.name || "Guest"}
              </div>

              <div className="email hidden sm:block truncate text-sm text-gray-400">
                {user?.email || ""}
              </div>
            </div>
          )}

        </div>

        {/* Logout */}
        <ConfirmDialog
          trigger={
            <button
              type="button"
              className="nav-item w-full border-0 bg-transparent text-left"
            >
              <LogOut />

              {!collapsed && (
                <span>Sign out</span>
              )}
            </button>
          }
          title="Sign out?"
          description="Are you sure you want to sign out of your account?"
          confirmText="Sign out"
          onConfirm={handleLogout}
        />
      </div>
    </aside>
  );
}