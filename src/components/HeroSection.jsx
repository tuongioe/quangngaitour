import React, { useState } from "react";
import {
  MapPinIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  PlayCircleIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import "../assets/styles/Global.css";

const locations = [
  {
    name: "Đảo Lý Sơn",
    place: "Huyện Lý Sơn",
    description:
      "Lý Sơn là huyện đảo thuộc tỉnh Quảng Ngãi, được mệnh danh là “thiên đường giữa biển khơi” với cảnh quan hoang sơ và hùng vĩ.",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758526841/daot_ly_son_ltwejg.jpg",
    video: "https://www.youtube.com/embed/YLuRbwYDY9Y",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758526841/daot_ly_son_ltwejg.jpg",
  },
  {
    name: "Núi Thiên Ấn",
    place: "TP. Quảng Ngãi",
    description:
      "Núi Thiên Ấn, biểu tượng linh thiêng của Quảng Ngãi, nằm bên bờ sông Trà Khúc. Trên đỉnh núi có chùa Thiên Ấn cổ kính, phong cảnh hữu tình.",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1760794809/nui-an-song-tra_1_fr1tab.png",
    video: "https://www.youtube.com/embed/ixN6iid-4p8",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758275493/nui-thien-an-song-tra-vntrip_oiiybl.jpg",
  },
  {
    name: "Biển Mỹ Khê",
    place: "TP. Quảng Ngãi",
    description:
      "Biển Mỹ Khê Quảng Ngãi nổi tiếng với bãi cát trắng mịn, làn nước trong xanh và hàng dừa trải dài thơ mộng. Nơi đây còn được biết đến với những món hải sản tươi ngon",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758527548/bien-my-khe-quang-ngai-_ogy5yf.jpg",
    video: "https://www.youtube.com/embed/SUlqD041Ktk",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758527548/bien-my-khe-quang-ngai-_ogy5yf.jpg",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const location = locations[current];

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % locations.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + locations.length) % locations.length);
  };

  return (
    <section
      className="relative h-screen w-screen bg-cover bg-center text-white flex items-center"
      style={{ backgroundImage: `url(${location.bg})` }}
    >
      {/* Content */}
      <div className="relative h-[50rem] z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <p className="text-lg mb-4 flex gap-2 uppercase font-bold items-center text-shadow-lg">
            <MapPinIcon className="h-6 w-6" />
            {location.place}
          </p>
          <h1 className="lg:text-7xl uppercase font-bold mb-4 text-shadow-hero">
            {location.name}
          </h1>
          <p className="text-md mb-6 w-[450px] leading-relaxed text-justify text-shadow-md">
            {location.description}
          </p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center gap-2 bg-blue-300/40 text-xl font-semibold text-white px-4 py-2 rounded-xl">
              Explore
              <ArrowRightIcon className="h-6 w-6" />
            </button>
            <i onClick={handleShowVideo}>
              <PlayCircleIcon className="h-12 w-12 text-white cursor-pointer hover:text-white/40" />
            </i>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center w-full overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 30}%)`,
            }}
          >
            {locations.map((loc, idx) => {
              const isActive = idx === current;
              const isNext = idx === (current + 1) % locations.length;

              return (
                <motion.div
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  initial={{ opacity: 0.6 }}
                  animate={{
                    opacity: isActive ? 1 : isNext ? 0.5 : 0.3,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                    isActive ? "z-20" : "z-10"
                  }`}
                  style={{
                    width: "250px",
                    height: "400px",
                    filter: isNext ? "brightness(0.8)" : "brightness(1)",
                  }}
                >
                  <img
                    src={loc.thumb}
                    alt={loc.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-4 left-4 text-white drop-shadow-md">
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPinIcon className="h-4 w-4" /> {loc.place}
                    </div>
                    <h3 className="font-semibold text-lg">{loc.name}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nút điều hướng */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-[2%] bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-[2%] bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Popup video */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative w-[90%] md:w-[60%] h-[60%]">
              <iframe
                width="100%"
                height="100%"
                src={location.video}
                title={location.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl shadow-lg"
              ></iframe>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white px-3 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
