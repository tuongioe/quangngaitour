import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white py-10">
      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-6">
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-purple-700 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-purple-700 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-purple-700 transition"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="#"
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-purple-700 transition"
        >
          <FaTwitter />
        </a>
      </div>

      {/* Menu Links */}
      <div className="flex flex-wrap justify-center space-x-6 mb-4 text-sm font-medium">
        <a href="#" className="hover:text-gray-300">
          FAQ
        </a>
        <a href="#" className="hover:text-gray-300">
          Services
        </a>
        <a href="#" className="hover:text-gray-300">
          About Us
        </a>
        <a href="#" className="hover:text-gray-300">
          Contact
        </a>
        <a href="#" className="hover:text-gray-300">
          Privacy Policy
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-300">
        © 2025 QuangNgaiTour | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
