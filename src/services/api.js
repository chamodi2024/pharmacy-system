import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8081";
const api = axios.create({
  baseURL: backendBaseUrl ? `${backendBaseUrl.replace(/\/$/, "")}/api` : "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API response error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("API request made but no response:", error.request);
    } else {
      console.error("API setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

/* Load saved token */
const storedToken = localStorage.getItem("pharmacy_token");

if (storedToken) {
  api.defaults.headers.common["Authorization"] =
    `Bearer ${storedToken}`;
}

/* Set / Remove token */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("pharmacy_token", token);

    api.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
  } else {
    localStorage.removeItem("pharmacy_token");

    delete api.defaults.headers.common["Authorization"];
  }
};

export const logout = () => setAuthToken(null);

/* ===========================
   MEDICINES
=========================== */

export const getMedicines = async () => {
  const response = await api.get("/medicines");
  return response.data;
};

export const addMedicine = async (medicine) => {
  const response = await api.post("/medicines", medicine);
  return response.data;
};

export const updateMedicine = async (id, medicine) => {
  const response = await api.put(`/medicines/${id}`, medicine);
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await api.delete(`/medicines/${id}`);
  return response.data;
};

/* ===========================
   BILLS
=========================== */

export const getBills = async () => {
  const response = await api.get("/bills");
  return response.data;
};

export const createBill = async (billData) => {
  const response = await api.post("/bills", billData);
  return response.data;
};

export const deleteBill = async (id) => {
  const response = await api.delete(`/bills/${id}`);
  return response.data;
};

/* ===========================
   AUTH
=========================== */

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export default api;