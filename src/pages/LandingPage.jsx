import React from "react";
import HeroSection from "../components/HeroSection";
import LandingPageBody from "../components/LandingPageBody";

export default function LandingPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <HeroSection />
      <LandingPageBody />
    </div>
  );
}
