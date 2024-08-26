import govermentSchems from "../models/auth/govermentSchems.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const newSchemes = asyncHandler(async (req, res, next) => {
  const newData = new govermentSchems(req?.body);
  await newData.save();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

export const getAllSchemes = asyncHandler(async (req, res, next) => {
  const data = await govermentSchems.find();
  res.status(200).json({ status: true, data });
});

export const deleteSchemes = asyncHandler(async (req, res, next) => {
  const isValidId = await govermentSchems.findByIdAndDelete(req?.params?.id);
  if (!isValidId) {
    return next(new errorResponse("No data found with given id!!", 400));
  }
  res.status(200).json({ status: true, message: "Deleted Successfully!!" });
});
