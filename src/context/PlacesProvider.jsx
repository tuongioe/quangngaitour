// src/context/PlacesContext.jsx
import { useState, useEffect } from "react";
import { createContext } from "react";

const PlacesContext = createContext();

export function PlacesProvider({ children }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async (category) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5001/api/places${
          category ? "?category=" + category : ""
        }`
      );
      const data = await res.json();
      setPlaces(data);
    } catch (err) {
      console.error("Error fetching places:", err);
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <PlacesContext.Provider value={{ places, loading, fetchPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
}
