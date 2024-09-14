import errorResponse from "../utils/errorResponse.js";
import CryptoJS from "crypto-js";
import { passwordRegex } from "../utils/other.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import auth from "../models/auth/auth.js";
import session from "../models/auth/session.js";
import { token } from "morgan";
import role from "../models/auth/role.js";

// @desc  - Signup
// @route - POST api/v1/auth/signup
// @access- Public

export const signup = asyncHandler(async (req, res, next) => {
  const { email, phoneNumber, username, password } = req.body;

  // if (!passwordRegex.test(password)) {
  //   return next(
  //     new errorResponse(
  //       "Password must contain a minimum of 7 and a maximum of 15 characters, and must include at least one special character, number, uppercase and lowercase alphabet",
  //       400
  //     )
  //   );
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
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

  res.cookie("PHEKU_TOKEN", token, {
    httpOnly: true,
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });

  res.status(200).json({
    status: true,
    message: "logged In successfully!!",
    token,
    username,
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
