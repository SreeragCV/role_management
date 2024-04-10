import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "",
  });
  const token = localStorage.getItem("token");
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  function handleChange(name, value) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
          headers: {
            token,
          },
        });
        const userData = response.data;
        if (userData) {
          setFormData({
            name: userData.name,
            email: userData.email,
            role: userData.role,
          });
        }
      } catch (error) {}
    };
    fetchUserDetails();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/${id}/edit`,
        {
          email: formData.email,
          name: formData.name,
          role: formData.role,
        },
        {
          headers: {
            token,
          },
        }
      );
      navigate("/users");
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
            value={formData.email}
            name="email"
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="input-container">
          <input
            value={formData.name}
            name="name"
            onChange={(e) => handleChange("name", e.target.value)}
            type="name"
            placeholder="Enter name"
          />
        </div>
        <div className="input-container">
          <select
            onChange={(e) => handleChange("role", e.target.value)}
            name="role"
            id=""
            value={formData.role}
          >
            <option disabled>Select role</option>
            <option value="manager">Manager</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="human-resource">Human Resource</option>
          </select>
        </div>
        <button type="submit" className="submit">
          Update
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

export default EditUser;
