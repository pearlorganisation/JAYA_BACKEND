import auth from "../models/auth/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const getAllUsers = await auth
    .find({ role: { $ne: "ADMIN" } })
    .select("username email profile phoneNumber role");

  if (getAllUsers.length == 0) {
    return res.status(404).json({ message: "No Users Found" });
  }

  res.status(200).json({ status: true, data: getAllUsers });

  next();
});
