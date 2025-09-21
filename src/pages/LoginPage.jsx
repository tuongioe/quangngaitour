import { useState, useContext } from "react";
import BlueBackground from "../assets/img/BlueBackground.jpg";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hadnleClearPassword = () => {
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      // ✅ gọi login trong context, sẽ tự set token + user
      login(res.data.token, res.data.user);

      toast.success("Login thành công!");
      navigate("/account");
    } catch (err) {
      // err.response.data.message thường có message từ server
      const message =
        err.response?.data?.message || err.message || "Login failed";

      setError(message);
      toast.error(message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url(${BlueBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-2xl p-8 lg:w-full lg:max-w-md w-96">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        {/* ✅ bọc luôn nút login trong form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <i
                className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={hadnleClearPassword}
              >
                <XCircleIcon className="h-5 w-5 text-gray-300" />
              </i>
              <i
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="h-8 w-8" />
                ) : (
                  <EyeSlashIcon className="h-8 w-8" />
                )}
              </i>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-700/30 hover:bg-blue-600/20 transition border-none text-white font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="">
          {/* Nút Create Account */}
          <button
            onClick={() => navigate("/register")}
            type="button"
            className="w-full py-2 mt-4 rounded-lg bg-white/30 hover:bg-white/20 border-none transition text-white font-semibold shadow-md"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-sm text-gray-200 mt-4">
          Forget your password?{" "}
          <a href="#" className="text-indigo-500 hover:text-indigo-600">
            Reset password
          </a>
        </p>
      </div>
    </div>
  );
}
