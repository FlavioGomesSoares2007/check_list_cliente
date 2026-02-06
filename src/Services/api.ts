import axios from "axios";

const api = axios.create({
  baseURL: "https://check-list-api.onrender.com",
});
export default api;
