import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status === 401) {
      // redirect to login in client code
    }
    return Promise.reject(err.response ? err.response.data : err);
  }
);

const login = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  return res;
};

const signup = async ({ name, email, password }) => {
  const res = await api.post("/auth/signup", { name, email, password });
  return res;
};

const getTasks = async (params) => {
  const res = await api.get("/tasks", { params });
  return res;
};

const createTask = async (payload) => {
  const res = await api.post("/tasks", payload);
  return res;
};

const updateTask = async (id, payload) => {
  const res = await api.put(`/tasks/${id}`, payload);
  return res;
};

const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res;
};

export default { login, signup, getTasks, createTask, updateTask, deleteTask };
