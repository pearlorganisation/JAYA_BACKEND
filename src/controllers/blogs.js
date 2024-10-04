import blogs from "../models/auth/blogs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import { uploadFileToCloudinary } from "../configs/cloudinary.js";

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

export const createBlog = asyncHandler(async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Blog image is required." });
    }

    const mediaData = await uploadFileToCloudinary(req.file);

    if (req.body && req.body.tags) {
      req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    const doc = new blogs({ ...req.body, blogImage: mediaData.secure_url });

    await doc.save();

    res
      .status(201)
      .json({ status: true, message: "Blog created successfully!" });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({
      status: false,
      message: "An error occurred while creating the blog.",
      error: error.message,
    });
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, date, tags, description } = req.body;

  // Fetch the blog post by ID
  const blog = await blogs.findById(id);
  console.log("Blog:", blog);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  let parsedTags = blog.tags;
  if (tags) {
    if (Array.isArray(tags)) {
      parsedTags = tags;
    } else {
      try {
        const parsed = JSON.parse(tags);
        if (Array.isArray(parsed)) {
          parsedTags = parsed;
        } else {
          throw new Error("Tags should be an array");
        }
      } catch (error) {
        parsedTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      }
    }
  }

  if (req.file) {
    try {
      const mediaData = await uploadFileToCloudinary(req.file);
      if (mediaData && mediaData.secure_url) {
        blog.blogImage = mediaData.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image Upload Error:", error);
      res.status(500);
      throw new Error("Failed to upload image");
    }
  }
  blog.title = title || blog.title;
  blog.date = date || blog.date;
  blog.tags = parsedTags || blog.tags;
  blog.description = description || blog.description;

  const updatedBlog = await blog.save();

  res.status(200).json({
    data: updatedBlog,
    status: true,
    message: "Blog updated successfully!",
  });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await blogs.findByIdAndDelete(id);

  if (!blog) {
    res.status(404).json({ status: false, message: "blog not Found !!" });
  }

  res.status(200).json({ status: true, message: "blog Deleted !!" });
});
