import Navbar from "../layout/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
export default function UserRoute({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const navi = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!user.user.token){
      navi("/login");
    } else {
      setLoading(false)
    }
  }, []);

  return !loading ? user && user.user.token ? (
    <>
      <Navbar />
      {children}
    </>
  ) : navi("/login") : <h1>Loading...</h1>
  
}
