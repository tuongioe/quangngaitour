import React from "react";
import "../assets/styles/HeaderComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ví dụ, thực tế sẽ lấy từ context hoặc redux

  const handleAccountClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="w-full flex items-center justify-center fixed z-50 lg:ml-2">
        <div className="lg:w-full max-w-6xl flex justify-between items-center bg-gray-200/40 backdrop-blur-md px-8 py-4 rounded-2xl mt-5">
          {/* Logo */}
          <h1
            className="lg:block hidden text-white text-2xl font-semibold cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="text-purple-900 text-3xl font-bold">
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
            <span
              onClick={handleAccountClick}
              className="text-white nav-link font-bold cursor-pointer"
            >
              Account
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}
