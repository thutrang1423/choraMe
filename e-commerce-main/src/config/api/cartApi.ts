import axios from "./axios.config";

export const fetchCartItems = async () => {
  const res = await axios.get("/cart", { withCredentials: true });
  return res.data;
};
