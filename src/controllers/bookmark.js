import { populate } from "dotenv";
import { bookMark } from "../models/bookmark/bookmark.js"; // Adjust the import path as necessary
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new bookmark
// export const createBookmark = asyncHandler(async (req, res) => {
//   const { userId, bookmarks } = req.body;

//   // Ensure userId and bookmarks are provided
//   if (!userId || !Array.isArray(bookmarks)) {
//     res.status(400);
//     throw new Error('Invalid input data');
//   }

//   const newBookmark = new bookMark({
//     userId,
//     bookmarks
//   });

//   const createdBookmark = await newBookmark.save();
//   res.status(201).json({
//     status: true,
//     message: 'Bookmark created successfully!',
//     data: createdBookmark
//   });
// });

// Get all bookmarks for a user
export const getBookmarksByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ status: false, message: "Bad Request !!" });
  }

  const bookmark = await bookMark
    .findOne({ userId })
    .populate("bookmarks", "title miniTitle tags")
    .lean();

  if (!bookmark) {
    res.status(404);
    throw new Error("Bookmark not found");
  }

  res.status(200).json({
    status: true,
    message: "Bookmarks fetched successfully!",
    data: bookmark,
  });
});

// Add a scheme to the bookmarks
export const addSchemeToBookmarks = asyncHandler(async (req, res, next) => {
  const { userId, schemeId } = req.body;

  if (!userId || !schemeId) {
    res.status(400);
    throw new Error("User ID and Scheme ID are required");
  }

  const schemeIsExist = await bookMark.findOne({ userId }).lean();

  const bookmarks = schemeIsExist.bookmarks.map(String);

  if (bookmarks.includes(schemeId)) {
    await bookMark
      .findOneAndUpdate({ userId }, { $pull: { bookmarks: schemeId } })
      .lean();
    return res.status(200).json({
      status: true,
      message: "Scheme Deleted from bookmarks successfully!",
    });
  }

  const updatedBookmark = await bookMark
    .findOneAndUpdate(
      { userId },
      { $addToSet: { bookmarks: schemeId } }, // Use $addToSet to avoid duplicates
      { new: true, upsert: true } // Create a new document if it doesn't exist
    )
    .populate("bookmarks");

  res.status(200).json({
    status: true,
    message: "Scheme added to bookmarks successfully!",
    data: updatedBookmark,
  });
});

// Remove a scheme from the bookmarks
export const removeSchemeFromBookmarks = asyncHandler(async (req, res) => {
  const { userId, schemeId } = req.body;

  if (!userId || !schemeId) {
    res.status(400);
    throw new Error("User ID and Scheme ID are required");
  }

  const updatedBookmark = await bookMark
    .findOneAndUpdate(
      { userId },
      { $pull: { bookmarks: schemeId } },
      { new: true }
    )
    .populate("bookmarks", "title miniTitle tags");

  if (!updatedBookmark) {
    return res
      .status(404)
      .json({ status: false, message: "Bookmark Not Found" });
  }

  res.status(200).json({
    status: true,
    message: "Scheme removed from bookmarks successfully!",
  });
});

// Delete a bookmark entry
export const deleteBookmark = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("User ID is required");
  }

  const deletedBookmark = await bookMark.findOneAndDelete({ userId });

  if (!deletedBookmark) {
    res.status(404).json({ status: false, message: "Bookmark not found" });
  }

  res.json({
    status: true,
    message: "Bookmark deleted successfully!",
    data: deletedBookmark,
  });
});
