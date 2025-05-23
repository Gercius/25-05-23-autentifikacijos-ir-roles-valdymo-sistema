import { AppError } from "../utils/AppError.js";
import { prisma } from "../utils/prisma.js";

export const addRole = async (req, res, next) => {
    const { roleName } = req.body;

    try {
        const role = await prisma.role.findUnique({ where: { name: roleName } });
        if (role) throw new AppError(`${roleName} role jau egzsistuoja`, 400);

        await prisma.role.create({ data: { name: roleName } });

        res.json({ message: `${roleName} role prideta` });
    } catch (error) {
        next(error);
    }
};

export const removeRole = async (req, res, next) => {
    const roleId = parseInt(req.params.roleId);

    try {
        const role = await prisma.role.findUnique({ where: { id: roleId } });
        if (!role) throw new AppError(`role id: ${roleId} nerasta`, 404);

        await prisma.role.delete({ where: { id: roleId } });

        res.json({ message: `${role.name} role pasalinta` });
    } catch (error) {
        next(error);
    }
};

export const addUserRole = async (req, res, next) => {
    const { userId, roleName } = req.body;

    try {
        const role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) throw new AppError(`${roleName} role nerasta`, 404);

        const hasRole = await prisma.userRole.findFirst({ where: { userId, roleId: role.id } });
        if (hasRole) throw new AppError(`Vartotojas ${userId} jau turi ${roleName} role`, 400);

        await prisma.userRole.create({ data: { userId, roleId: role.id } });

        res.json({ message: `Vartotojui ${userId} prideta ${roleName} role` });
    } catch (error) {
        next(error);
    }
};

export const removeUserRole = async (req, res, next) => {
    const { userId, roleName } = req.body;

    try {
        const role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) throw new AppError(`${roleName} role nerasta`, 404);

        const userRole = await prisma.userRole.findFirst({ where: { userId, roleId: role.id } });
        if (!userRole) throw new AppError(`Vartotojas ${userId} neturi ${roleName} roles`, 404);

        await prisma.userRole.delete({ where: { id: userRole.id } });

        res.json({ message: `Vartotojui ${userId} pasalinta ${roleName} role ` });
    } catch (error) {
        next(error);
    }
};

export const blockUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);

    try {
        await prisma.user.update({ where: { id: userId }, data: { blocked: true } });

        res.json({ message: `Vartotojas ${userId} uzblokuotas` });
    } catch (error) {
        next(error);
    }
};

export const unblockUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);

    try {
        await prisma.user.update({ where: { id: userId }, data: { blocked: false } });

        res.json({ message: `Vartotojas ${userId} atblokuotas` });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);

    try {
        await prisma.user.delete({ where: { id: userId } });

        res.json({ message: `Vartotojas ${userId} istrintas` });
    } catch (error) {
        next(error);
    }
};
