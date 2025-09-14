import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Khi có token -> call API lấy user info
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5001/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          if (data?.user) setUser(data.user);
        })
        .catch(() => {
          logout(); // token hết hạn -> logout FE
        });
    } else {
      setUser(null);
    }
  }, [token]);

  // login FE: lưu token + user
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  // logout FE: chỉ xoá localStorage + state
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
