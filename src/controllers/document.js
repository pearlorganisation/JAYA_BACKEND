import documents from "../models/auth/documents.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import { uploadFileToCloudinary } from "../configs/cloudinary.js";

export const newDocument = asyncHandler(async (req, res, next) => {
  console.log(req.file, "req.file");
  const mediaData = await uploadFileToCloudinary(req?.file || null);

  const { name, user, documentTitle } = req.body;
  console.log(req.body);
  const payload = {
    user,
    name,
    documentsCollection: [
      { path: mediaData?.secure_url || "shubham", title: documentTitle },
    ],
  };
  const doc = new documents(payload);
  await doc.save();
  res
    .status(201)
    .json({ status: true, message: "document created successfully!!", doc });
});

export const getAllDocuments = asyncHandler(async (req, res, next) => {
  const data = await documents.find();
  res.status(200).json({ status: true, data });
});

export const getAllDocumentsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await documents.find({ user: id });

  if (!id) res.status(400).json({ status: true, message: "Bad Request !!" });

  if (!data) {
    res.status(404).json({ status: true, message: "Document Not Found !!" });
  }

  res
    .status(200)
    .json({ status: true, message: "Fetched Document Successfully !!", data });
});
export const addDocuments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { documentTitle } = req.body;
  const mediaData = await uploadFileToCloudinary(req?.file);
  const data = await documents.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        documentsCollection: {
          path: mediaData.secure_url || "something went wrong",
          title: documentTitle,
        },
      },
    },
    {
      new: true,
    }
  );

  if (!id) res.status(400).json({ status: true, message: "Bad Request !!" });

  if (!data) {
    res.status(404).json({ status: true, message: "Document Not Found !!" });
  }

  res
    .status(200)
    .json({ status: true, message: "Fetched Document Successfully !!", data });
});

export const removeDocuments = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { documentId } = req.body;

  const data = await documents.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        documentsCollection: { _id: documentId },
      },
    },
    {
      new: true,
    }
  );

  if (!data) {
    res.status(404).json({ status: true, message: "Document Not Found !!" });
  }

  res
    .status(200)
    .json({ status: true, message: "Deleted Document Successfully !!", data });
});

// export const getAllDocumentsById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ status: false, message: "Bad Request !!" });
//   }
//   const userId = new mongoose.Types.ObjectId(id);

//   let data = await documents.aggregate([
//     { $match: { user: userId } },
//     {
//       $group: {
//         _id: "$name", // Group by the name field
//         name: { $first: "$name" },
//         count: { $sum: 1 }, // Count the number of documents for each name
//         documents: { $push: "$document" }, // Collect all document URLs in an array
//       },
//     },
//     {
//       $sort: {
//         _id: -1, // Sort by the grouped field (name) in ascending order (1 for ascending, -1 for descending)
//       },
//     },
//   ]);

//   if (!data || data.length === 0) {
//     return res
//       .status(404)
//       .json({ status: false, message: "Document Not Found !!" });
//   }

//   res
//     .status(200)
//     .json({ status: true, message: "Fetched Document Successfully !!", data });
// });
