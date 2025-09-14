import React, { useEffect, useState } from "react";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  UserIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import BlueBackground from "../assets/img/BlueBackground.jpg";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  const [editMode, setEditMode] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setEditedUser(data);
        if (data?._id) {
          fetchFavorites(data._id);
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
      const res = await fetch(
        `http://localhost:5001/api/users/${userId}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Save profile
  const handleSave = async () => {
    try {
      const { name, phone, address, avatar } = editedUser;
      const res = await fetch("http://localhost:5001/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, phone, address, avatar }),
      });
      const data = await res.json();
      setUser(data);
      setEditedUser(data);
      setEditMode({});
      setShowAvatarInput(false);
      console.log("User updated:", data);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

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
              <h2 className="text-2xl font-bold text-blue-500">
                {editedUser?.name || "Loading..."}
              </h2>
            )}
            <PencilSquareIcon
              className="w-6 h-6 text-gray-200 cursor-pointer hover:text-white"
              onClick={() => setEditMode({ ...editMode, name: !editMode.name })}
            />
          </div>

          {/* Role */}
          <p className="text-lg text-gray-200">{editedUser?.role || ""}</p>

          {/* Menu */}
          <div className="mt-8 w-full space-y-3">
            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl ${
                activeTab === "profile"
                  ? "bg-white/30 text-white"
                  : "hover:bg-white/20 text-gray-200"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <UserIcon className="w-5 h-5" /> Profile
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl ${
                activeTab === "favorite"
                  ? "bg-white/30 text-white"
                  : "hover:bg-white/20 text-gray-200"
              }`}
              onClick={() => setActiveTab("favorite")}
            >
              <HeartIcon className="w-5 h-5" /> Favorite Place
            </button>

            <button
              className={`flex items-center gap-3 px-4 py-2 w-full rounded-xl ${
                activeTab === "add"
                  ? "bg-white/30 text-white"
                  : "hover:bg-white/20 text-gray-200"
              }`}
              onClick={() => setActiveTab("add")}
            >
              <PlusCircleIcon className="w-5 h-5" /> Add New Place
            </button>

            <button
              className="flex items-center gap-3 px-4 py-2 w-full rounded-xl hover:bg-red-500/40 text-red-200"
              onClick={handleLogout}
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-2/3 p-8 overflow-y-auto text-white">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

              {/* Email (chỉ hiển thị) */}
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <p>Email: {editedUser?.email}</p>
              </div>

              {/* Phone */}
              <div className="bg-white/20 rounded-xl p-4 mb-4 flex justify-between items-center">
                {editMode.phone ? (
                  <input
                    value={editedUser.phone || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                    className="px-2 py-1 rounded text-black"
                  />
                ) : (
                  <p>Phone: {editedUser?.phone || "N/A"}</p>
                )}
                <PencilSquareIcon
                  className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white"
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

          {activeTab === "favorite" && (
            <h2 className="text-2xl font-bold">Your Favorite Places</h2>
          )}

          {activeTab === "add" && (
            <h2 className="text-2xl font-bold">Add a New Place</h2>
          )}
        </div>
      </div>
    </div>
  );
}
