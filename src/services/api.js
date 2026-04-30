import axios from "axios";

const normalizeApiBase = (value) => {
  const cleaned = (value || "").trim().replace(/\/+$/, "");
  if (!cleaned) return "/api";
  return cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
};

const primaryBaseURL = normalizeApiBase(import.meta.env.VITE_API_URL);
const fallbackBaseURLs = ["/api", "http://localhost:8081/api", "http://localhost:8080/api"].filter(
  (baseURL, index, urls) => baseURL !== primaryBaseURL && urls.indexOf(baseURL) === index
);

const api = axios.create({
  baseURL: primaryBaseURL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const isNetworkError = !!error.request && !error.response;
    const retryIndex = originalRequest._apiRetryIndex ?? -1;
    const nextBaseURL = fallbackBaseURLs[retryIndex + 1];

    if (isNetworkError && nextBaseURL) {
      originalRequest._apiRetryIndex = retryIndex + 1;
      originalRequest.baseURL = nextBaseURL;
      return api.request(originalRequest);
    }

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
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

/* Set / Remove token */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("pharmacy_token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("pharmacy_token");
    delete api.defaults.headers.common.Authorization;
  }
};

export const logout = () => setAuthToken(null);

/* ===========================
   MEDICINES
=========================== */

export const getMedicines = async () => {
  const response = await api.get("/medicines");
  const payload = response.data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.medicines)) return payload.medicines;
  if (Array.isArray(payload?.data)) return payload.data;

  return [];
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
  const payload = response.data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.bills)) return payload.bills;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.value)) return payload.value;

  return [];
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
