import axios from "axios";

const baseURL = process.env.BASE_URL;

export default axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosApi = axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosFakeStore = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: { "Content-Type": "application/json" },
});
