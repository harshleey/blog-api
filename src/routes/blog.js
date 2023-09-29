import express from "express";
import upload from "../middleware/multer.js";
const router = express.Router();
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  filterByTag,
} from "../controllers/blog.js";
import { tokenAuth } from "../middleware/tokenAuth.js";

router
  .post("/", tokenAuth, upload.single("file"), createBlog)
  .get("/", getBlogs)
  .get("/:id", getBlog)
  .put("/:id", tokenAuth, updateBlog)
  .delete("/:id", tokenAuth, deleteBlog)
  .get("/findTag/:tag", filterByTag);

export default router;
