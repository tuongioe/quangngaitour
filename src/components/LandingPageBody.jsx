import React from "react";
import "../assets/styles/LandingPageBody.css";
import LandingPageBackground from "../assets/img/LandingPageBackground.jpg";
import PreviewComponent from "./PreviewComponent";

export default function LandingPageBody() {
  return (
    <div
      className="h-screen w-screen bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url(${LandingPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PreviewComponent />
    </div>
  );
}
