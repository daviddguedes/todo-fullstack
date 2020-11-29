import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import history from "../../navigation/history";

function Home() {
  const { user, handleLogout } = useContext(AuthContext);

  if (!user) {
      history.push('/login');
  }

  return (
      <div>
          <h1>Wellcome {user?.name}</h1>
          <button type="button" onClick={handleLogout}>LogOut</button>
      </div>
  );
}

export default Home;
