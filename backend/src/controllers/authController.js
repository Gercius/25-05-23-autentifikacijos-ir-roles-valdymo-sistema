import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { prisma } from "../utils/prisma.js";
import { AppError } from "../utils/AppError.js";

export const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) throw new AppError("Toks vartotojas jau egzistuoja", 400);

        const hashed = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
            },
        });

        const userRole = await prisma.role.findUnique({ where: { name: "user" } });
        if (!userRole) throw new AppError("Vartotojo role nerasta", 500);

        await prisma.userRole.create({
            data: {
                userId: user.id,
                roleId: userRole.id,
            },
        });

        res.status(201).json({ message: "Registracija sekminga", user });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new AppError("Vartotojas nerastas", 404);

        if (user.blocked) throw new AppError("Vartotojas uzblokuotas", 403);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AppError("Neteisingas slaptazodis", 401);

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};
