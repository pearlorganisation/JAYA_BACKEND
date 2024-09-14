import blogs from "../models/auth/blogs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import { uploadFileToCloudinary } from "../configs/cloudinary.js";

export const createBlog = asyncHandler(async (req, res, next) => {
  const mediaData = await uploadFileToCloudinary(req?.file);

  const doc = new blogs({ ...req?.body, blogImage: mediaData?.secure_url });
  await doc.save();
  res
    .status(201)
    .json({ status: true, message: "Blog created successfully!!" });
});

export const getAllBlogs = asyncHandler(async (req, res, next) => {
  const getAllBlogs = await blogs.find();

  if (getAllBlogs.length == 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }

  res.status(200).json({ status: true, data: getAllBlogs });
});

export const getSingleBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const getBlog = await blogs.findById(id);

  if (getBlog.length == 0) {
    return res.status(404).json({ message: "No Blogs Found" });
  }

  res.status(200).json({ status: true, data: getBlog });
});
