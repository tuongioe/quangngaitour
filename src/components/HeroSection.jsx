import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/16/solid";

const locations = [
  {
    name: "Núi Thiên Ấn",
    place: "TP. Quảng Ngãi",
    description:
      "Núi Thiên Ấn là ngọn núi nổi tiếng nằm bên bờ sông Trà Khúc, cách trung tâm thành phố Quảng Ngãi chỉ vài kilômét. Với hình dáng tựa chiếc ấn đóng trên nền trời, nơi đây không chỉ gắn liền với vẻ đẹp thiên nhiên hùng vĩ mà còn mang giá trị văn hoá, lịch sử đặc sắc. Trên đỉnh núi có chùa Thiên Ấn cổ kính, là điểm đến tâm linh được nhiều du khách và Phật tử tìm đến để chiêm bái, ngắm nhìn toàn cảnh thành phố và dòng sông Trà thơ mộng.",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758275493/nui-thien-an-song-tra-vntrip_oiiybl.jpg",
    video: "https://www.youtube.com/embed/ixN6iid-4p8",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758275493/nui-thien-an-song-tra-vntrip_oiiybl.jpg",
  },
  {
    name: "Đảo Lý Sơn",
    place: "Huyện Lý Sơn",
    description:
      "Lý Sơn là huyện đảo thuộc tỉnh Quảng Ngãi, được mệnh danh là “thiên đường giữa biển khơi” với cảnh quan hoang sơ và hùng vĩ. Nơi đây nổi bật với những ngọn núi lửa hàng triệu năm tuổi, bãi biển trong xanh, bờ cát trắng mịn và những ruộng hành tỏi trải dài – đặc sản làm nên thương hiệu “vương quốc tỏi”. Ngoài vẻ đẹp thiên nhiên, Lý Sơn còn lưu giữ nhiều giá trị văn hóa – lịch sử gắn liền với đội Hoàng Sa năm xưa, là điểm đến lý tưởng cho những ai yêu biển đảo và muốn khám phá.",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758526841/daot_ly_son_ltwejg.jpg",
    video: "https://www.youtube.com/embed/VIDEO_ID_2",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758526841/daot_ly_son_ltwejg.jpg",
  },
  {
    name: "Biển Mỹ Khê",
    place: "TP. Quảng Ngãi",
    description:
      "Biển Mỹ Khê Quảng Ngãi nằm cách trung tâm thành phố khoảng 15 km, nổi tiếng với bãi cát trắng mịn, làn nước trong xanh và hàng dừa trải dài thơ mộng. Đây là điểm đến lý tưởng để tắm biển, nghỉ dưỡng và thưởng thức hải sản tươi ngon. Với vẻ đẹp hoang sơ, yên bình, Mỹ Khê được ví như một trong những bãi biển đẹp nhất miền Trung, thu hút đông đảo du khách mỗi năm.",
    bg: "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758527548/bien-my-khe-quang-ngai-_ogy5yf.jpg",
    video: "https://www.youtube.com/embed/VIDEO_ID_3",
    thumb:
      "https://res.cloudinary.com/ddwkzkht5/image/upload/v1758527548/bien-my-khe-quang-ngai-_ogy5yf.jpg",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const location = locations[current];

  return (
    <section
      className="relative h-screen w-screen bg-cover bg-center text-white flex items-center"
      style={{ backgroundImage: `url(${location.bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative h-[50rem] z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {location.name}
          </h1>
          <p className="text-lg mb-6 flex gap-2">
            <i>
              <MapPinIcon className="h-6 w-6" />
            </i>
            {location.place}
          </p>
          <p className="text-md mb-6 w-[450px] leading-relaxed text-justify">
            {location.description}
          </p>

          {/* Carousel thumbnails */}
          <div className="flex gap-4 overflow-x-auto py-2 mt-5">
            {locations.map((loc, idx) => (
              <img
                key={idx}
                src={loc.thumb}
                alt={loc.name}
                className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  idx === current ? "border-yellow-400" : "border-transparent"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </div>

        {/* Right column (YouTube video) */}
        <div className="flex items-center justify-center">
          <div className="w-full h-64 md:h-96">
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
          </div>
        </div>
      </div>
    </section>
  );
}
