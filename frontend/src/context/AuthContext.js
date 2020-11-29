import { createContext, useState, useEffect } from "react";
import history from "../navigation/history";
import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const { user, token } = JSON.parse(userData);
      setUser(user);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  async function handleRegister({ name, email, password }) {
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      history.push("/login");
    } catch (err) {
      setErrorMessage(err.response.data.error);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const { data } = await api.post("/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("userData", JSON.stringify(data));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      setUser(data.user);
      history.push("/");
    } catch (err) {
      localStorage.removeItem("userData");
      api.defaults.headers.Authorization = undefined;
      setErrorMessage(err.response.data.error);
    }
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("userData");
    api.defaults.headers.Authorization = undefined;
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
        user,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
