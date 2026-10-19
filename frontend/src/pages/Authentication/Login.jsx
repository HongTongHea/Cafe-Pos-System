
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APT from "../../Api/backendApi";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setMessage("");

        try {
            const identifier = formData.email.trim();

            const res = await APT.post("/auth/login", {
                identifier,
                password: formData.password,
            });

            const { token, user } = res.data || {};

            if (!token || !user) {
                throw new Error("Invalid login response from server");
            }

            if (!["admin", "cashier"].includes(user.role)) {
                setMessage(
                    "Your account does not have permission to access the POS."
                );
                setMessageType("error");
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setMessage("Welcome back! Opening your workspace...");
            setMessageType("success");

            if (user.role === "admin") {
                navigate("/AdminDashboard", { replace: true });
            } else {
                navigate("/POS", { replace: true });
            }
        } catch (error) {
            console.error("Login error:", error);

            const status = error.response?.status;
            const serverMessage = error.response?.data?.message;

            if (status === 401) {
                setMessage(
                    "Incorrect name/email or password. Please try again."
                );
            } else if (status === 403) {
                setMessage(
                    serverMessage ||
                    "Your account is inactive or not authorized."
                );
            } else if (status === 400) {
                setMessage(
                    serverMessage ||
                    "Please enter your name/email and password."
                );
            } else if (error.response) {
                setMessage(
                    serverMessage || "Unable to log in. Please try again."
                );
            } else if (error.request) {
                setMessage(
                    "Cannot connect to the server. Check that your backend is running."
                );
            } else {
                setMessage(
                    "An unexpected error occurred. Please try again."
                );
            }

            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#493322]/10 md:grid md:grid-cols-2">

                {/* Branding panel */}
                <section className="relative flex min-h-55 flex-col justify-between overflow-hidden bg-[#111827] p-7 text-white sm:p-10 md:min-h-155">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#d8b58a]/20" />
                    <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-[#d8b58a]/20" />
                    <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#061938]/20 blur-2xl" />

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9ad7c] text-[#38271f]">
                            <i className="fa-solid fa-mug-hot text-xl" />
                        </div>

                        <div>
                            <p className="text-lg font-bold tracking-wide">
                                CAFFEE & FOOD
                            </p>
                            <p className="text-xs tracking-[0.2em] text-[#d9c5b1]">
                                CAFE MANAGEMENT
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 py-8">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#d9ad7c]">
                            Your cafe, your workspace
                        </p>

                        <h1 className="max-w-sm text-4xl font-bold leading-tight sm:text-5xl">
                            Great coffee.
                            <span className="block text-[#d9ad7c]">
                                Smooth service.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#dfd3c8]">
                            Manage orders, serve customers, and keep your cafe
                            running smoothly — all in one place.
                        </p>
                    </div>

                    <div className="relative z-10 hidden items-center gap-3 border-t border-white/10 pt-6 md:flex">
                        <i className="fa-solid fa-shield-halved text-[#d9ad7c]" />
                        <p className="text-xs text-[#dfd3c8]">
                            Secure access for authorized admin and staff only
                        </p>
                    </div>
                </section>

                {/* Login form */}
                <section className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12">
                    <div className="w-full max-w-sm">

                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold text-[#9b704e]">
                                WELCOME BACK
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-[#38271f]">
                                Please Login
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Sign in using your account name or email address.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Name or email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#49382e]"
                                >
                                    Name or Email Address
                                </label>

                                <div className="flex h-12 items-center gap-3 rounded-xl border border-[#dcd6e2af] bg-[#fcfaf7] px-4 transition focus-within:border-[#a66b43] focus-within:ring-2 focus-within:ring-[#a66b43]/15">
                                    <i className="fa-regular fa-user text-[#a58c78]" />

                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="Enter your name or email"
                                        autoComplete="username"
                                        className="w-full bg-transparent text-sm text-[#38271f] outline-none placeholder:text-gray-400"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-[#49382e]"
                                >
                                    Password
                                </label>

                                <div className="flex h-12 items-center gap-3 rounded-xl border border-[#dcd6e2af] bg-[#fcfaf7] px-4 transition focus-within:border-[#a66b43] focus-within:ring-2 focus-within:ring-[#a66b43]/15">
                                    <i className="fa-solid fa-lock text-[#a58c78]" />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className="w-full bg-transparent text-sm text-[#38271f] outline-none placeholder:text-gray-400"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="text-[#a58c78] transition hover:text-[#38271f]"
                                    >
                                        <i
                                            className={`fa-solid ${showPassword
                                                ? "fa-eye"
                                                : "fa-eye-slash"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Feedback */}
                            {message && (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className={`rounded-xl px-4 py-3 text-sm ${messageType === "success"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-700"
                                        }`}
                                >
                                    <i
                                        className={`fa-solid ${messageType === "success"
                                            ? "fa-circle-check"
                                            : "fa-circle-exclamation"
                                            } mr-2`}
                                    />
                                    {message}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#061938] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in to System
                                        <i className="fa-solid fa-arrow-right text-xs" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-7 border-t border-[#eee6de] pt-5">
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-circle-info mt-0.5 text-[#a66b43]" />
                                <p className="text-xs leading-5 text-gray-500">
                                    Need an account? Please contact your
                                    administrator. Public registration is disabled.
                                </p>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-xs text-gray-400">
                            © {new Date().getFullYear()} Caffee & Food | All rights reserved.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;
