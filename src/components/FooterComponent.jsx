import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-start">
        {/* Cột 1: Logo */}
        <div className="flex flex-col mb-6 min-w-[200px]">
          <div className="flex justify-center lg:justify-start">
            <div className="h-32 w-64">
              <img
                src="https://res.cloudinary.com/ddwkzkht5/image/upload/v1757595859/Gemini_Generated_Image_jn3xofjn3xofjn3x-removebg-preview_dbegkq.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
              <h2 className="text-2xl font-bold lg:ml-10">QuangNgaiTour</h2>
            </div>
          </div>
        </div>

        {/* Cột 2: Subscribe */}
        <div className="mt-4 min-w-[200px]">
          <h2 className="text-2xl font-bold text-white lg:mt-4 lg:ml-14 mb-6">
            Sign up for news!
          </h2>
          <form className="flex flex-row max-w-xs gap-x-2 ">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md outline-none bg-indigo-700/40 text-gray-500"
            />
            <button
              type="submit"
              className="bg-indigo-800 px-4 py-2 rounded-r-md hover:bg-blue-800"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Cột 3: Overview + Social */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6 min-w-[200px] mt-4">
          {/* Overview */}
          <div>
            <h4 className="mb-2 font-bold uppercase text-md text-gray-400">
              Overview
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-indigo text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo text-white ">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-2 font-bold uppercase text-md text-gray-400">
              Follow us
            </h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-indigo text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo text-white ">
                  Linked in
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo text-white ">
                  Tiktok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo text-white ">
                  Git hub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between border-t border-gray-700 pt-4 mt-4 text-sm">
        <span>Powered by TruongTuong</span>
        <span>&copy; 2025 quangngaitour.app</span>
      </div>
    </footer>
  );
};

export default Footer;
