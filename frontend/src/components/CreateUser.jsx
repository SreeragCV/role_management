import React, { useContext, useState } from "react";
import axios from "axios";
import { RolesContext } from "../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  const navigate = useNavigate();

  function handleChange(name, value) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/create-user",
        {
          email: formData.email,
          name: formData.name,
          role: formData.role,
          password: formData.password,
        },
        {
          headers: {
            token,
          },
        }
      );
      navigate('/users')
    } catch (err) {
      console.log("Error!", err);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <p className="form-title">Create Account</p>
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
            name="name"
            onChange={(e) => handleChange("name", e.target.value)}
            type="name"
            placeholder="Enter name"
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
        <div className="input-container">
          <select
            onChange={(e) => handleChange("role", e.target.value)}
            name="role"
            id=""
          >
            <option selected disabled>
              Select role
            </option>
            <option value="manager">Manager</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="human-resource">Human Resource</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Sign up
        </button>
      </form>
      <div className="navBtn-container">
        <div className="navBtns">
          <button>
            <Link to={"/users"}>Users</Link>
          </button>
        </div>
        <div className="navBtns">
          <button>
            <Link to={"/"}>Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
