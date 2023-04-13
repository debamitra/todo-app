import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
        console.log("response")
        console.log(response)
        localStorage.removeItem("token");
        navigate("/login");
      }
    console.log("in api.js")
    console.log(response)
    return response;
  },
  (error) => {
    const navigate = useNavigate();
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
