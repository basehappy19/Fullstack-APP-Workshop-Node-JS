import axios from "axios";

export const list = async (authtoken) =>
  await axios.get(import.meta.env.VITE_REACT_APP_API + "/user", {
    headers: {
      authtoken,
    },
  });

export const changeRole = async (authtoken,data) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/change-role",{data}, {
    headers: {
      authtoken,
    },
  });
