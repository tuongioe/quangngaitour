import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import Logo from "../assets/img/logo.png";
import "../assets/styles/HeaderComponent.css";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }

      logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-100/30 backdrop-blur-md shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Cột trái: Logo + tên web */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold text-white">
              {t("siteName")}
            </span>
          </Link>
        </div>

        {/* Cột giữa: Menu */}
        <nav className="hidden md:flex gap-8 justify-center lg:mr-20">
          <Link to="/about" className="nav-link text-white font-semibold">
            {t("about")}
          </Link>
          <Link
            to="/places?category=destinations"
            className="nav-link text-white font-semibold"
          >
            {t("destinations")}
          </Link>
          <Link
            to="/places?category=restaurants"
            className="nav-link text-white font-semibold"
          >
            {t("restaurants")}
          </Link>
          <Link to="/speciality" className="nav-link text-white font-semibold">
            {t("speciality")}
          </Link>
        </nav>

        {/* Cột phải: Ngôn ngữ + Login */}
        <div className="flex items-center gap-4 relative">
          {/* Chọn ngôn ngữ */}
          <select
            defaultValue={i18n.language}
            onChange={(e) => handleChangeLanguage(e.target.value)}
            className="bg-transparent text-white border border-white rounded px-2 py-1 text-sm cursor-pointer"
          >
            <option value="vn">VN</option>
            <option value="en">EN</option>
          </select>

          {/* Tài khoản / Login */}
          <div
            className="relative "
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span
              onClick={handleAccountClick}
              className="text-white font-semibold cursor-pointer"
            >
              {user ? user.name || t("account") : t("login")}
            </span>

            {/* Dropdown */}
            {user && showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                <button
                  onClick={() => navigate("/account")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {t("account")}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
