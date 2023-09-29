"use strict";
import express from "express";
import dotenv from "dotenv";

import blogRoute from "../src/routes/blog.js";
import authRoute from "../src/routes/tokenAuth.js";

const app = express();
app.use(express.json());
dotenv.config();

//Env variables
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// app.METHOD(PATH, HANDLER);
app.use(express.static("public"));

function logger(req, res, next) {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
}

app.use("/api/users", logger, authRoute);
app.use("/api/blogs", logger, blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
