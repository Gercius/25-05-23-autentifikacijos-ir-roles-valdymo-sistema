import express from "express";
import errorHandler from "./middleware/errorHandlerMIddleware.js";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "Alive" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);

export default app;
