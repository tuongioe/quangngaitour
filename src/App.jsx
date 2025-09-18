import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./Layout.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AddPlacePage from "./pages/AddPlacePage.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PlaceDetailPage from "./pages/PlaceDetailPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import "./i18n";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Route cha có Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="About" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="add-place" element={<AddPlacePage />} />
          <Route path="places/:category" element={<PlacePage />} />
          <Route path="places/:id" element={<PlaceDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
