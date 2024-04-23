import FormProduct from "./components/FormProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormEditProduct from "./components/FormEditProduct";
import "./App.css";
import { CssBaseline, } from "@mui/material";
import Navbar from "./layout/Navbar";

// pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import NotFound404 from "./pages/NotFound404";
import Line from "./pages/auth/Line";

// user
import HomePageUser from "./pages/user/HomePageUser";

// admin
import HomePageAdmin from "./pages/admin/HomePageAdmin";
import ManageUser from "./pages/admin/ManageUser";

// Routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

// function

import { currentUser } from "./functions/AuthFunction";

import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.getItem("token");
  currentUser(idToken)
    .then((res) => {
      console.log(res);
      dispatch(
        login({
          name: res.data.name,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((err) => console.log(err));

  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <ToastContainer />

        {/* Publish */}

        <Routes>
          <Route
            path="*"
            element={
              <NotFound404 text="The page you’re looking for doesn’t exist." />
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <h1>Homepages</h1>
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/line" element={<Line />} />
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomePageUser />
              </UserRoute>
            }
          />

          {/* Admin */}

          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <ManageUser />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>
        {/* User */}

        {/* <TestRedux>

        </TestRedux>
        <hr />
        <TestRedux2>

        </TestRedux2> */}
      </>
    </BrowserRouter>
  );
}

export default App;
