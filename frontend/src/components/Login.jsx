import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RolesContext } from "../store/AuthContext";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { role, setRole } = useContext(RolesContext);

  const navigate = useNavigate();

  function handleChange(name, value) {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: loginData.email,
        password: loginData.password
      });

      setRole(response.data.role);
      const authToken = response.headers.get("Authorization");
      localStorage.setItem("token", authToken);
      navigate("/");
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <p className="form-title">Login</p>
        <div className="input-container">
          <input
            name="email"
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="input-container">
          <input
            name="password"
            onChange={(e) => handleChange("password", e.target.value)}
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button className="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
