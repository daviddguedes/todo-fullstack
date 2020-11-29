import { createContext, useState } from "react";
import history from "../navigation/history";
import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function handleRegister({ name, email, password }) {
    try {
      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      history.push('/login');
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const { data } = await api.post("/auth/signin", {
        email,
        password,
      });

      setUser(data.user);
      history.push('/');
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  return (
    <AuthContext.Provider value={{ handleLogin, handleRegister, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
