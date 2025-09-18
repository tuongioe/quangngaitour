import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <HeaderComponent />

      {/* Nội dung thay đổi theo route */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <FooterComponent className="absolute bg-transparent" />
    </div>
  );
}
