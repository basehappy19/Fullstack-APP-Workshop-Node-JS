import axios from "axios";

export const listby = async (limit,sort,order) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/productby", {
    limit,
    sort,
    order,
  });

export const remove = async (id) =>
  await axios.delete(import.meta.env.VITE_REACT_APP_API + "/product/" + id);

export const create = async (data) =>
  await axios.post(import.meta.env.VITE_REACT_APP_API + "/product", data);

export const getData = async () => {
  return await axios.get(import.meta.env.VITE_REACT_APP_API + "/product");
};
export const read = async (id) => {
  return await axios.get(import.meta.env.VITE_REACT_APP_API + "/product/" + id);
};
export const update = async (id, data) =>
  await axios.put(import.meta.env.VITE_REACT_APP_API + "/product/" + id, data);
