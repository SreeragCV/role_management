import "./App.css";
import CreateUser from "./components/CreateUser.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import { useCallback, useContext, useEffect } from "react";
import { RolesContext } from "./store/AuthContext.js";
import Home from "./components/Home.jsx";
import UserList from "./components/UserList.jsx";
import axios from "axios";
import EditUser from "./components/EditUser.jsx";
import Error from "./components/Error.jsx";

function App() {
  const { role, setRole } = useContext(RolesContext);

  const token = localStorage.getItem("token");
  const checkAuthenticated = useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/is-auth", {
          headers: {
            token: token ? token : "",
          },
        });
        if (response.data.status === true) {
          const role = response.data.role;
          setRole(role);
        } else {
          setRole("");
        }
      } catch (e) {
        console.log("errorrrr", e);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    checkAuthenticated();
  }, [role, setRole]);

  const router = createBrowserRouter([
    {
      errorElement: <Error/>
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: token ? <Navigate to={"/"} /> : <Login />,
    },
    {
      path: "/create-user",
      element:
        token && role === "admin" ? <CreateUser /> : <Navigate to={"/"} />,
    },
    {
      path: "/users",
      element: token && role === "admin" ? <UserList /> : <Navigate to={"/"} />,
    },
    {
      path: "/users/:id/edit",
      element:
        token && role === "admin" ? <EditUser /> : <Navigate to={"/"} />,
    },
  ]);

  console.log(role);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
