import { fetchRequest } from "../utils/fetch";

const API_URL = "http://localhost:8888/api/v1/auth";

//Login
export const login = async (email, password) => {
    const res = await fetchRequest(API_URL, "/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    const userData = res.data;

    if (userData.token) {
        localStorage.setItem("jwtToken", userData.token);
    }

    if (userData.id) {
        localStorage.setItem("userId", userData.id);
    }

    return userData;
};

//Register
export const register = async (userData) => {
    const data = await fetchRequest(API_URL, "/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (userData.token) {
        localStorage.setItem("jwtToken", userData.token);
    }

    if (userData.id) {
        localStorage.setItem("userId", userData.id);
    }
    console.log(data);
    return data;
};

//Logout

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
};
