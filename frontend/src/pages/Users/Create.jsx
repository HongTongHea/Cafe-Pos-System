import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import APT from "../../Api/backendApi";
import Sidebar from "../../layouts/Sidebar";
import Topbar from "../../layouts/Topbar";

export default function UserCreate() {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleClear = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
        });

        setError("");
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // INPUT
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // CREATE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await APT.post("/users", formData);

            console.log("Created user:", response.data);

            navigate("/users", {
                state: {
                    success: "User created successfully.",
                },
            });

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to create user."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((prev) => !prev)}
            />
            <div className="main">
                <Topbar />

                <main className="content">
                    {/* HEADER */}
                    <div
                        className="page-head">
                        <div>
                            <h1>Create User</h1>
                            <p>
                                Manage your user
                            </p>
                        </div>
                        <button className="flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-amber-950 hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            type="button"
                            onClick={() => navigate("/users")}>
                            <ArrowLeft size={18} />
                            Back to Users
                        </button>

                    </div>

                    {/* ERROR */}

                    {error && (
                        <div
                            style={{
                                padding: 12,
                                marginBottom: 16,
                                background: "#fee2e2",
                                color: "#991b1b",
                                borderRadius: 8,
                            }}>
                            {error}
                        </div>
                    )}

                    {/* FORM */}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <form className="max-w-full mx-auto" onSubmit={handleSubmit}>
                            {/* NAME */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition"
                                >
                                    Clear
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {loading ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
