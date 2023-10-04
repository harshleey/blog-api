"use strict";
import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/not_found.js";

import blogRoute from "../src/routes/blog.js";
import authRoute from "../src/routes/tokenAuth.js";

const app = express();
app.use(express.json());
dotenv.config();

//Env variables
const PORT = process.env.PORT;

// Implement middlewares
app.use(logger);
app.use(errorHandler);
app.use(notFound);

// app.METHOD(PATH, HANDLER);
app.use(express.static("public"));

app.use("/api/users", authRoute);
app.use("/api/blogs", blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
