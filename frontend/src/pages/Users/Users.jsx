import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import APT from "../../Api/backendApi";
import Sidebar from "../../layouts/Sidebar";
import Topbar from "../../layouts/Topbar";
import DataTable from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Alert from "../../components/ui/Alert";

export default function Users() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ==========================================
    // GET USERS
    // ==========================================

    const getUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await APT.get("/users");

            // console.log("Users:", response.data);

            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (Array.isArray(response.data.users)) {
                setUsers(response.data.users);
            } else if (Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error(err);

            setError(err.response?.data?.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // ==========================================
    // SUCCESS MESSAGE FROM NAVIGATION (Create/Edit pages)
    // ==========================================

    useEffect(() => {
        if (location.state?.success) {
            setSuccess(location.state.success);
            navigate(location.pathname, { replace: true, state: {} });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    useEffect(() => {
        if (!success) return;

        const timer = setTimeout(() => {
            setSuccess("");
        }, 2000);

        return () => clearTimeout(timer);
    }, [success]);

    // ==========================================
    // DELETE USER
    // ==========================================

    const handleDelete = async (id) => {
        try {
            await APT.delete(`/users/${id}`);

            setUsers((prev) => prev.filter((user) => user.id !== id));

            setSuccess("User deleted successfully.");

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to delete user.");
        }
    };

    // ==========================================
    // INITIALS
    // ==========================================

    const getInitials = (name = "") => {
        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }

        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    return (
        <div
            className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((prev) => !prev)}
            />
            <div className="main">
                <Topbar />

                <main className="content">
                    {/* HEADER */}

                    <div
                        className="page-head"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <div>
                            <h1>Users</h1>
                            <p
                                style={{
                                    color: "var(--muted)",
                                    marginTop: 5,
                                }}>
                                Manage system users
                            </p>
                        </div>

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

                    {/* ALERTS */}

                    <Alert
                        type="success"
                        message={success}
                        onClose={() => setSuccess("")}
                    />

                    <Alert type="error" message={error} onClose={() => setError("")} />

                    {/* TABLE */}
                    <div className="card">
                        <DataTable
                            columns={["User", "Email", "Created", "Status", "Actions"]}
                            data={users}
                            pageLength={10}
                            searchPlaceholder="Search users..."
                            nonSortableColumns={[4]}
                            renderRow={(user) => (
                                <tr key={user.id}>
                                    {/* USER */}
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                            }}>
                                            <div className="avatar">{getInitials(user.name)}</div>

                                            <div>
                                                <div
                                                    style={{
                                                        fontWeight: 600,
                                                    }}>
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    {/* EMAIL */}
                                    <td>
                                        <span className="email">{user.email}</span>
                                    </td>

                                    {/* CREATED */}

                                    <td
                                        style={{
                                            color: "var(--muted)",
                                        }}>
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    {/* STATUS */}

                                    <td>
                                        <span
                                            className="badge"
                                            style={{
                                                background:
                                                    user.status === "inactive" ? "#fee2e2" : "#dcfce7",

                                                color:
                                                    user.status === "inactive" ? "#991b1b" : "#166534",

                                                padding: "5px 10px",
                                                borderRadius: 20,
                                            }}>
                                            {user.status || "active"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}

                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 8,
                                            }}>
                                            {/* EDIT */}

                                            <button
                                                type="button"
                                                onClick={() => navigate(`/users/edit/${user.id}`)}
                                                title="Edit"
                                                style={{
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                }}>
                                                <Edit size={17} />
                                            </button>

                                            {/* DELETE */}
                                            <ConfirmDialog
                                                trigger={
                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        style={{
                                                            border: "none",
                                                            background: "transparent",
                                                            color: "#dc2626",
                                                            cursor: "pointer",
                                                        }}>
                                                        <Trash2 size={17} />
                                                    </button>
                                                }
                                                title="Delete user?"
                                                description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
                                                confirmText="Delete"
                                                destructive
                                                onConfirm={() => handleDelete(user.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
