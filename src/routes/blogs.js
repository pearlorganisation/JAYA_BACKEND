import express from "express";

import { upload } from "../middlewares/multer.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogs.js";

const router = express.Router();
router.route("/").get(getAllBlogs).post(upload.single("blogImage"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .put(upload.single("blogImage"), updateBlog)
  .delete(deleteBlog);

export default router;
