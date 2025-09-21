import React, { useEffect, useState } from "react";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  UserIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import BlueBackground from "../assets/img/BlueBackground.jpg";
import axiosClient from "../utils/axiosClient";
import axios from "axios";

export default function AccountPage({ userId }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "destination",
    description: "",
    address: "",
    images: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // lấy token sau khi login

      const res = await axios.post(
        "http://localhost:5001/api/places",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // gửi kèm token
            "Content-Type": "application/json",
          },
        }
      );

      alert("Thêm địa điểm thành công!");
      console.log("Place:", res.data);
    } catch (error) {
      console.error("Error when adding place:", error);
      alert(error.response?.data?.message || "Lỗi khi thêm địa điểm");
    }
  };

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/users/me");
        setUser(res.data);
        setEditedUser(res.data);
        if (res.data?._id) {
          fetchFavorites(res.data._id);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch favorites
  const fetchFavorites = async (userId) => {
    try {
      const res = await axiosClient.get(`/users/${userId}/favorites`);
      setFavorites(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchFavorites(userId);
    }
  }, [userId]);

  // Logout
  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout"); // gọi BE clear cookie nếu có
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      const { name, phone, address, avatar } = editedUser;
      const res = await axiosClient.put("/users/me", {
        name,
        phone,
        address,
        avatar,
      });
      setUser(res.data);
      setEditedUser(res.data);
      setEditMode({});
      setShowAvatarInput(false);
      console.log("User updated:", res.data);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };
  //Add new place

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${BlueBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-[75rem] h-[40rem] rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg overflow-hidden mt-10">
        {/* Sidebar */}
        <div className="w-[25rem] bg-white/10 p-6 flex flex-col items-center relative">
          {/* Avatar + change icon */}
          <div className="relative">
            <img
              src={editedUser?.avatar || "https://via.placeholder.com/150"}
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover border-2 border-white shadow-md mt-8"
            />
            <button
              className="absolute bottom-2 right-2 bg-blue-500 p-1 rounded-full text-white hover:bg-blue-600"
              onClick={() => setShowAvatarInput(!showAvatarInput)}
            >
              <PlusCircleIcon className="w-6 h-6" />
            </button>
          </div>

          {showAvatarInput && (
            <div className="mt-3 w-full">
              <input
                type="text"
                placeholder="Enter avatar link..."
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                className="w-[266px] px-3 py-2 rounded-lg text-black"
              />
              <button
                onClick={() => {
                  setEditedUser({ ...editedUser, avatar: newAvatar });
                  setShowAvatarInput(false);
                  setNewAvatar("");
                }}
                className="mt-2 ml-2 px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          )}

          {/* Name + edit */}
          <div className="flex items-center gap-2 mt-4">
            {editMode.name ? (
              <input
                value={editedUser.name || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="px-2 py-1 rounded text-black"
              />
            ) : (
              <h2 className="text-2xl font-bold text-blue-500/70">
                {editedUser?.name || "Loading..."}
              </h2>
            )}
            <PencilSquareIcon
              className="w-6 h-6 text-white cursor-pointer hover:text-gray-200"
              onClick={() => setEditMode({ ...editMode, name: !editMode.name })}
            />
          </div>

          {/* Role */}
          <p className="text-lg text-gray-100">{editedUser?.role || ""}</p>

          {/* Menu */}
          <div className="mt-8 w-48 space-y-3">
            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl bg-transparent text-bold border-none text-white ${
                activeTab === "profile"
                  ? "bg-blue-600/30 text-white"
                  : "hover:bg-gray-200/30 text-white"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <UserIcon className="w-5 h-5" /> Profile
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl bg-transparent text-bold border-none text-white ${
                activeTab === "favorite"
                  ? "bg-blue-600/30 text-white"
                  : "hover:bg-white/30 text-gray-200"
              }`}
              onClick={() => setActiveTab("favorite")}
            >
              <HeartIcon className="w-5 h-5" /> Favorite Place
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl bg-transparent text-bold border-none text-white ${
                activeTab === "add"
                  ? "bg-blue-600/30 text-white"
                  : "hover:bg-white/30 text-white"
              }`}
              onClick={() => setActiveTab("add")}
            >
              <PlusCircleIcon className="w-5 h-5" /> Add New Place
            </button>

            <button
              className="flex items-center gap-3 px-4 py-2 w-full rounded-xl hover:bg-red-600/70 hover:text-white bg-transparent text-bold text-red-500"
              onClick={handleLogout}
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-2/3 p-8 overflow-y-auto text-white">
          {activeTab === "profile" && (
            <div className="lg:w-full">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

              {/* Email (chỉ hiển thị) */}
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <p>Email: {editedUser?.email}</p>
              </div>

              {/* Phone */}
              <div className="bg-white/20 rounded-xl p-4 mb-4 flex justify-between items-center text-semibold">
                {editMode.phone ? (
                  <input
                    value={editedUser.phone || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                    className="px-2 py-1 rounded bg-gray-300/50 text-white"
                  />
                ) : (
                  <p>Phone: {editedUser?.phone || "N/A"}</p>
                )}
                <PencilSquareIcon
                  className="w-5 h-5 text-white cursor-pointer hover:text-gray-200"
                  onClick={() =>
                    setEditMode({ ...editMode, phone: !editMode.phone })
                  }
                />
              </div>

              {/* Address */}
              <div className="bg-white/20 rounded-xl p-4 mb-4 flex justify-between items-center">
                {editMode.address ? (
                  <input
                    value={editedUser.address || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, address: e.target.value })
                    }
                    className="px-2 py-1 rounded text-black"
                  />
                ) : (
                  <p>Address: {editedUser?.address || "N/A"}</p>
                )}
                <PencilSquareIcon
                  className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white"
                  onClick={() =>
                    setEditMode({ ...editMode, address: !editMode.address })
                  }
                />
              </div>

              {/* Save + Logout */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === "add" && (
            <div>
              <h2 className="text-2xl font-bold">Add new place</h2>
              <form
                onSubmit={handleAddPlace}
                className="space-y-3 p-4 border rounded"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Tên địa điểm"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full text-black bg-white"
                  required
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 w-full text-black bg-white"
                  required
                >
                  <option value="destination">Destination</option>
                  <option value="restaurant">Restaurant</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Mô tả"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 w-full  text-black bg-white"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-2 w-full  text-black bg-white"
                  required
                />

                <div>
                  <label className="block mb-1">Ảnh (URL):</label>
                  {formData.images.map((img, index) => (
                    <input
                      key={index}
                      type="text"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Ảnh ${index + 1}`}
                      className="border p-2 w-full mb-2  text-black bg-white"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    + Thêm ảnh
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Thêm địa điểm
                </button>
              </form>
            </div>
          )}

          {activeTab === "favorite" && (
            <div>
              <h2 className="text-2xl font-bold">Your Favorite Places</h2>
              {favorites.length === 0 ? (
                <p>Chưa có địa điểm yêu thích nào.</p>
              ) : (
                <ul className="space-y-4">
                  {favorites.map((fav) => (
                    <li
                      key={fav._id}
                      className="p-4 border rounded-lg shadow-sm bg-white"
                    >
                      {/* Nếu backend populate Place thì có fav.place */}
                      <h3 className="text-lg font-semibold">
                        {fav.place?.name}
                      </h3>
                      <p className="text-gray-600">{fav.place?.address}</p>

                      {fav.place?.images?.length > 0 && (
                        <img
                          src={fav.place.images[0]}
                          alt={fav.place.name}
                          className="mt-2 w-48 h-32 object-cover rounded"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
