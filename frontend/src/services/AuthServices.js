import { fetchRequest } from "../utils/fetch";

const API_URL = "http://localhost:8888/api/v1/auth";

//Login
export const login = async (email, password) => {
    const res = await fetchRequest(API_URL, "/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    return res.data;
};

//Register
export const register = async (userData) => {
    const res = await fetchRequest(API_URL, "/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    return res.data;
};

//Logout
export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
};
