import { AppError } from "../utils/AppError.js";

const errorHandler = (err, req, res, next) => {
    const status = (err instanceof AppError && err.status) || 500;
    const message = err.message || "Internal Server Error";

    console.error("Error:", message);

    res.status(status).json({
        status: "error",
        message,
    });
};

export default errorHandler;
