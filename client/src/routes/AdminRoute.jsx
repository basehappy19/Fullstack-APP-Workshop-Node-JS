import SideBar from "../layout/SideBar";
import HeaderBar from "../layout/HeaderBar";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../functions/AuthFunction";


export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const navi = useNavigate()
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then((res) => {
          setOk(true)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          setOk(false)
        });
    } else {
      setLoading(false)
      navi('/login')
    }
  }, [user]);

  return !loading ? ok ? (
    <div className="app">
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">{children}</Box>
        </div>
      </main>
    </div>
  ) : navi("/login") : <h1>Loading...</h1>;
}
