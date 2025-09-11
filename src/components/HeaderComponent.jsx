import React, { useContext, useState } from "react";
import "../assets/styles/HeaderComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // import context

export default function HeaderComponent() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext); // lấy user từ context
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAccountClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        credentials: "include", // gửi cookie kèm
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }

      // Xoá token localStorage nếu có
      localStorage.removeItem("token");
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center fixed z-50 lg:ml-2">
        <div className="lg:w-full max-w-6xl flex justify-between items-center bg-gray-100/30 shadow-lg backdrop-blur-md px-8 py-4 rounded-2xl mt-5">
          {/* Logo */}
          <h1 className="lg:block hidden text-white text-2xl font-semibold cursor-pointer">
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              QuangNgaiTour
            </span>
          </h1>

          {/* Menu */}
          <nav className="flex space-x-8">
            <Link to="/about" className="text-white nav-link font-bold">
              About
            </Link>
            <Link
              to="/places?category=destinations"
              className="text-white nav-link font-bold"
            >
              Destinations
            </Link>
            <Link
              to="/places?category=restaurants"
              className="text-white nav-link font-bold"
            >
              Restaurants
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span
                onClick={handleAccountClick}
                className="text-white nav-link font-bold cursor-pointer"
              >
                {user ? user.name || "Account" : "Login"}
              </span>

              {/* Dropdown khi hover */}
              {user && showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                  <button
                    onClick={() => navigate("/account")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
