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

const adminRouter = express();

adminRouter.post("/add-role", addRole);
adminRouter.post("/remove-role/:roleId", removeRole);
adminRouter.post("/add-user-role", addUserRole);
adminRouter.post("/remove-user-role", removeUserRole);
adminRouter.post("/block-user/:userId", blockUser);
adminRouter.post("/unblock-user/:userId", unblockUser);
adminRouter.post("/delete-user/:userId", deleteUser);

export default adminRouter;
