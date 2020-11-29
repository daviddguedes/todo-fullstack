import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";

function Register() {
  const { handleRegister } = useContext(AuthContext);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          handleRegister({
            name: "User 1",
            email: "email1@email.com",
            password: "lalala",
          })
        }
      >
        Register
      </button>

      <button type="button" onClick={() => history.push("/login")}>
        Login
      </button>
    </div>
  );
}

export default Register;
