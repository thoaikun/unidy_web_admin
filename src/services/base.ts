import { Session } from "@models/session";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const data = localStorage.getItem("session");
    if (data) {
        const session : Session = JSON.parse(data);
        if (session) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }
    }
    else {
        if (window.location.pathname !== "/login")
            window.location.href = "/login";
    }

    return config;
});


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.removeItem("session");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;

