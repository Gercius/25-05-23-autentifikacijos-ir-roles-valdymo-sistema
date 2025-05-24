import { createContext, useContext, useEffect, useState } from "react";
import * as authServices from "../services/AuthServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || null);
    const [userRoles, setUserRoles] = useState(() => JSON.parse(localStorage.getItem("userRoles")) || []);
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("jwtToken"));

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem("jwtToken", token);
        } else {
            setIsLoggedIn(false);
            localStorage.removeItem("jwtToken");
        }
    }, [token]);

    const getResponse = async (response) => {
        const data = await response;

        if (data?.token) {
            setToken(data.token);
            localStorage.setItem("jwtToken", data.token);
        }
        if (data?.roles) {
            setUserRoles(data.roles);
            localStorage.setItem("userRoles", JSON.stringify(data.roles));
        }
        if (data.id) localStorage.setItem("userId", data.id);

        return data;
    };

    // Login
    const login = async (email, password) => {
        return getResponse(authServices.login(email, password));
    };

    // Logout
    const logout = async () => {
        setToken(null);
        setUserRoles([]);
        authServices.logout();
    };

    // Register
    const register = async (userData) => {
        return getResponse(authServices.register(userData));
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, setToken, login, logout, register, getResponse, userRoles }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth turi buti naudojamas su Auth provider");

    return context;
};
