import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return <h1>Wellcome {user?.name}</h1>;
}

export default Home;
