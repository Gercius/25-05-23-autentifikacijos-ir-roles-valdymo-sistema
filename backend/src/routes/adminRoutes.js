import express from "express";
import {
    addRole,
    addUserRole,
    blockUser,
    deleteUser,
    removeRole,
    removeUserRole,
    unblockUser,
} from "../controllers/adminController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const adminRouter = express();

adminRouter.post("/add-role", protect, isAdmin, addRole);
adminRouter.post("/remove-role/:roleId", protect, isAdmin, removeRole);
adminRouter.post("/add-user-role", protect, isAdmin, addUserRole);
adminRouter.post("/remove-user-role", protect, isAdmin, removeUserRole);
adminRouter.post("/block-user/:userId", protect, isAdmin, blockUser);
adminRouter.post("/unblock-user/:userId", protect, isAdmin, unblockUser);
adminRouter.post("/delete-user/:userId", protect, isAdmin, deleteUser);

export default adminRouter;
