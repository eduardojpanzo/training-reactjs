import axios from "axios";

export const apiServices = axios.create({
  baseURL: "http://localhost:5678/webhook",
  headers: {
    "Content-Type": "application/json",
    "Accept-Type": "application/json",
  },
});
