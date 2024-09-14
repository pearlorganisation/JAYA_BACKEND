import express from "express";

import { upload } from "../middlewares/multer.js";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blogs.js";

const router = express.Router();
router.route("/").get(getAllBlogs).post(upload.single("blogImage"), createBlog);
router.route("/:id").get(getSingleBlog);

export default router;
