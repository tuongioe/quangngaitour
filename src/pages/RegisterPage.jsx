import { useState } from "react";
import BlueBackground from "../assets/img/BlueBackground.jpg";
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hadnleClearPassword = () => {
    setPassword("");
  };
  const checkPasswordStrength = (pwd) => {
    let strengthValue = 0;
    if (pwd.length >= 8) strengthValue++;
    if (/[A-Z]/.test(pwd)) strengthValue++;
    if (/[0-9]/.test(pwd)) strengthValue++;
    if (/[^A-Za-z0-9]/.test(pwd)) strengthValue++;

    switch (strengthValue) {
      case 0:
      case 1:
        setStrength("Weak");
        break;
      case 2:
        setStrength("Medium");
        break;
      case 3:
      case 4:
        setStrength("Strong");
        break;
      default:
        setStrength("");
    }
  };

  const checkEmailValidation = (email) => {
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setError("Email must be include @gmail.com");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register failed");
      }

      toast.success("Đăng ký thành công!");
      setError("");
      setEmail("");
      setPassword("");
      setPhone("");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BlueBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg rounded-2xl p-8 lg:w-full lg:max-w-md w-96">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkEmailValidation(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordStrength(e.target.value);
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div
                className={`h-2 rounded ${
                  strength === "Weak"
                    ? "bg-red-500 w-1/3"
                    : strength === "Medium"
                    ? "bg-yellow-500 w-2/3"
                    : strength === "Strong"
                    ? "bg-green-500 w-full"
                    : ""
                }`}
              ></div>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Error */}
          <div className="min-h-[20px]">
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          {/* Nút Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-700/30 hover:bg-blue-600/20 border-none transition text-white font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-200 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-indigo-500 hover:text-indigo-600"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
