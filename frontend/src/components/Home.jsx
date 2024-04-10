import React, { useContext } from "react";
import { RolesContext } from "../store/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { role, setRole } = useContext(RolesContext);
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    setRole("");
  }

  return (
    <div className="home">
      <h2>HOME</h2>
      {role === "admin" ? (
        <div className="home-btns">
          <div className="navBtns">
            <button>
              <Link to={"/create-user"}>Create-User</Link>
            </button>
          </div>
          <div className="navBtns">
            <button>
              <Link to={"/users"}>All Users</Link>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {token && role && (
        <button onClick={handleLogout} className="submit">
          Logout
        </button>
      )}
      {!token && !role && (
        <button className="submit">
          <Link style={{ color: "white" }} to={"/login"}>
            Log In
          </Link>
        </button>
      )}
    </div>
  );
}

export default Home;
