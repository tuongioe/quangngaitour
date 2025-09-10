import { useParams } from "react-router-dom";

export default function PlacePage() {
  const { category } = useParams();

  return (
    <div>
      <h1>{category === "restaurants" ? "Nhà hàng" : "Địa điểm du lịch"}</h1>
      {/* fetch API: GET /places?category=${category} */}
    </div>
  );
}
