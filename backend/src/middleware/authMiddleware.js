import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import { prisma } from "../utils/prisma.js";
import { JWT_SECRET } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("No token provided", 401));
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
        const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!currentUser) return next(new AppError("User not found", 401));

        req.user = currentUser;
        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
};

export const isAdmin = async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return next(new AppError("Neleista", 401));

    const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });
    if (!adminRole) return next(new AppError("Admin role nerasta", 500));

    const userRole = await prisma.userRole.findFirst({
        where: { userId: userId, roleId: adminRole.id },
    });

    if (!userRole) return next(new AppError("Prieiga draudziama, reikia admin roles", 403));

    next();
};
