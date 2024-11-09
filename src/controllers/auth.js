import errorResponse from "../utils/errorResponse.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import auth from "../models/auth/auth.js";

import role from "../models/auth/role.js";
import { uploadFileToCloudinary } from "../configs/cloudinary.js";
import { isValidPhoneNumber } from "libphonenumber-js";

// @desc  - Signup
// @route - POST api/v1/auth/signup
// @access- Public

export const signup = asyncHandler(async (req, res, next) => {
  const { email, phoneNumber, username, password } = req.body;

  const existingUser = await auth.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: false,
      message: "Email already in use. Please use a different email.",
    });
  }

  if (!isValidPhoneNumber(phoneNumber, "IN")) {
    return res.status(400).json({
      status: false,
      message:
        "Invalid phone number format. Please ensure the number is valid for India.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new auth({ ...req?.body, password: hashedPassword });
  await newUser.save();

  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", newUser });
});

// @desc  - Signin
// @route - POST api/v1/auth/signin
// @access- Public
export const signin = asyncHandler(async (req, res, next) => {
  const { password, username, email } = req?.body;
  const user = await auth.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return next(
      new errorResponse("No user found with given email/username!!", 400)
    );
  }
  const validPassword = await bcrypt.compare(password, user?.password);
  if (!validPassword) {
    return next(new errorResponse("Invalid password, Please try again!!", 400));
  }
  // await session.create({ sessionId: "dummyId", userId: user?._id });
  const token = jwt.sign(
    { userId: user?._id, role: user?.role },
    process.env.ACCESS_TOKEN_SECRETKEY,
    { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
  );

  res.cookie("JAYA_TOKEN", token, {
    httpOnly: true,
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });

  res.status(200).json({
    status: true,
    message: "logged In successfully!!",
    token,
    user,
  });
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const data = await auth.findById(req?.params?.id);
  res
    .status(data)
    .json({ status: true, mesasge: "Refresh token found successfully!!" });
});

export const newRole = asyncHandler(async (req, res, next) => {
  const roleData = await role.create(req?.body);
  res
    .status(201)
    .json({ status: true, message: "Created successfully!!", role: roleData });
});

export const getRole = asyncHandler(async (req, res, next) => {
  const roles = await role.find();
  res.status(200).json({ status: true, roles });
});
export const deleteRole = asyncHandler(async (req, res, next) => {
  const validId = await role.findByIdAndDelete(req?.params?.id);
  if (!validId) {
    return res
      .status(400)
      .json({ status: false, message: "No data found with given id!!" });
  }

  res.status(200).json({ status: true, message: "Deleted successfully!!" });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { email } = req.params;
  const { username, phoneNumber } = req.body;
  let profile = req?.file || null;
  if (profile) {
    profile = await uploadFileToCloudinary(profile);
  }

  if (!email) {
    return res.status(400).json({
      status: false,
      message: "Provide Valid Email Id and Password!!",
    });
  }

  const userData = await auth.findOne({ email });

  if (!userData) {
    return res
      .status(404)
      .json({ status: false, message: "Email Id Not Found !!" });
  }

  const query = {};

  if (username) {
    query.username = username;
  }
  if (profile) {
    query.profile = profile.url;
  }
  if (phoneNumber) {
    query.phoneNumber = phoneNumber;
  }
  console.log(query);
  const updatedProfile = await auth.findByIdAndUpdate(userData._id, query, {
    new: true,
  });

  res.status(200).json({
    status: true,
    message: "Profile  Updated Successfully  !!",
    updatedProfile,
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const { email } = req.params;

  const isEmailExists = await auth.findOne({ email });
  if (!isEmailExists) {
    return res
      .status(400)
      .json({ status: false, message: "Bad Request Provide Email  !!" });
  }

  const userProfileData = await auth
    .findOne({ email })
    .select("-password -createdAt -updatedAt -role")
    .lean();

  return res.status(200).json({
    status: true,
    message: "Profile Fetched Successfully  !!",
    data: userProfileData,
  });
});
