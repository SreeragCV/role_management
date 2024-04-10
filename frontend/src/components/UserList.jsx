import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RolesContext } from "../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UserList() {
  const [fetchUsers, setFetchUsers] = useState([]);
  const { role } = useContext(RolesContext);
  const [deleteUser, setDeleteUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handleDelete(id) {
    const response = await axios.delete(`http://localhost:5000/users/${id}`, {
      headers: {
        token,
      },
    });
    setDeleteUser(id);
  }

  function handleEdit(id) {
    navigate(`/users/${id}/edit`);
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          headers: {
            token,
          },
        });
        console.log(response.data);
        setFetchUsers(response.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchAllUsers();
  }, [role, deleteUser]);

  return (
    <div className="form-container">
      <table>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>role</th>
          <th>update / delete</th>
        </tr>
        {fetchUsers &&
          fetchUsers.length > 0 &&
          fetchUsers.map((elem) => {
            return (
              <tr key={elem._id}>
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>{elem.role}</td>
                <td>
                  <button onClick={() => handleEdit(elem._id)}>Edit</button>
                  <button onClick={() => handleDelete(elem._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="navBtn-container">
        <div className="navBtns">
          <button>
            <Link to={"/create-user"}>Create-user</Link>
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

export default UserList;
