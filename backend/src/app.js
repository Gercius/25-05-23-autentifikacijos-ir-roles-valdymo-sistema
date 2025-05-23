import express from "express";
import errorHandler from "./middleware/errorHandlerMIddleware.js";

const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Alive" });
});

app.use(errorHandler);

export default app;
