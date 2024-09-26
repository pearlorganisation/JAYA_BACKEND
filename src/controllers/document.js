import documents from "../models/auth/documents.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import { uploadFileToCloudinary } from "../configs/cloudinary.js";

export const newDocument = asyncHandler(async (req, res, next) => {
  const mediaData = await uploadFileToCloudinary(req?.file);

  const doc = new documents({ ...req?.body, document: mediaData?.secure_url });
  await doc.save();
  res
    .status(201)
    .json({ status: true, message: "document created successfully!!" });
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
