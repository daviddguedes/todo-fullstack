import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";

function Login() {
  const { handleLogin } = useContext(AuthContext);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          handleLogin({
            email: "email1@email.com",
            password: "lalala",
          })
        }
      >
        Login
      </button>

      <button type="button" onClick={() => history.push("/register")}>
        Register
      </button>
    </div>
  );
}

export default Login;
