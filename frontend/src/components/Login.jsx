import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APT from "../Api/backendApi";

function Login() {
    const [state, setState] = useState("login");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (state === "login") {
                // LOGIN
                const res = await APT.post("/auth/login", {
                    email: formData.email,
                    password: formData.password,
                });

                console.log("Login response:", res.data);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

                setFormData((prev) => ({
                    ...prev,
                    password: "",
                }));

                // setMessageType("success");
                setTimeout(() => {
                    navigate("/AdminDashboard", {
                        replace: true,
                        state: { loginSuccess: true },
                    });
                }, 800);



            } else {
                // REGISTER
                const res = await APT.post("/auth/register", {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                console.log("Register response:", res.data);

                if (res.data.token) {
                    localStorage.setItem(
                        "token",
                        res.data.token
                    );
                }

                if (res.data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.user)
                    );
                }

                setMessage("Registration successful! Please login.");
                setMessageType("success");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                setState("login");
            }

        } catch (error) {
            console.error("Auth error:", error);

            if (error.response?.status === 400) {
                setMessage("Invalid email or password.");
                setMessageType("error");
            }
            else {
                setMessage("An error occurred. Please try again.");
                setMessageType("error");

            }
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const switchMode = () => {
        setState((prev) =>
            prev === "login" ? "register" : "login"
        );

        setFormData({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">

            <form
                onSubmit={handleSubmit}
                className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
            >

                {/* TITLE */}
                <h1 className="text-white text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                    {state === "login"
                        ? "Please sign in to continue"
                        : "Create your account to continue"}
                </p>

                {message && (
                    <p
                        className={`text-sm mt-1 ${messageType === "success"
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    >
                        {message}
                    </p>
                )}

                {/* NAME */}
                {state === "register" && (
                    <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-xl overflow-hidden pl-4 gap-3">

                        <i className="fa-solid fa-user text-gray-400"></i>

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* EMAIL */}
                <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-xl overflow-hidden pl-4 gap-3">

                    <i className="fa-solid fa-envelope text-gray-400"></i>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-xl overflow-hidden pl-4 gap-3">

                    <i className="fa-solid fa-lock text-gray-400"></i>

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="button"
                        className="text-gray-400 hover:text-white transition pr-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <i className="fa-solid fa-eye"></i>
                        ) : (
                            <i className="fa-solid fa-eye-slash"></i>
                        )}
                    </button>
                </div>

                {/* FORGOT PASSWORD */}
                {state === "login" && (
                    <div className="mt-4 text-left">
                        <button
                            type="button"
                            className="text-sm text-indigo-400 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full h-11 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
                >
                    {loading
                        ? "Please wait..."
                        : state === "login"
                            ? "Login"
                            : "Sign up"}
                </button>

                {/* SWITCH */}
                <p
                    onClick={switchMode}
                    className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
                >
                    {state === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <span className="text-indigo-400 hover:underline ml-1">
                        {state === "login"
                            ? "Sign up"
                            : "Login"}
                    </span>
                </p>

            </form>
        </div>
    );
}

export default Login;