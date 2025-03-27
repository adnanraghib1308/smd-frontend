import axios from "axios";
import toast from "react-hot-toast";

// Load base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: BASE_URL || "http://localhost:4000/api/v1",
  withCredentials: true,
});

// Request interceptor to show loader
axiosClient.interceptors.request.use(
  (config) => {
    window.dispatchEvent(new Event("startLoading")); // Trigger loading event
    return config;
  },
  (error) => {
    window.dispatchEvent(new Event("stopLoading")); // Stop loading if error
    return Promise.reject(error);
  }
);

// Response interceptor to hide loader & handle errors
axiosClient.interceptors.response.use(
  (response) => {
    window.dispatchEvent(new Event("stopLoading")); // Stop loading
    if (response.data.success) {
      return response.data.data; // Only return relevant data
    }
    return response;
  },
  (error) => {
    window.dispatchEvent(new Event("stopLoading"));

    if (error.response && error.response.data) {
      const { error: err } = error.response.data;

      if (err?.message) {
        toast.error(err.message);
      }
    } else {
      toast.error("Something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
