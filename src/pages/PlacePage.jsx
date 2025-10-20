import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PlacesContext } from "../context/PlacesProvider.jsx";

export default function PlacePage() {
  const { category } = useParams();
  const { places, loading, fetchPlaces } = useContext(PlacesContext);

  useEffect(() => {
    fetchPlaces(category);
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {category === "restaurants" ? "Nhà hàng" : "Địa điểm du lịch"}
      </h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div
              key={place._id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{place.name}</h2>
              <p className="text-gray-600 text-sm">{place.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
