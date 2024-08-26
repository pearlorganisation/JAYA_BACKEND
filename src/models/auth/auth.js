import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../utils/other.js";

// Define your regex patterns as RegExp objects

const authSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Invalid email!! Please try again"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "Student",
      enum: ["Super-Admin", "Admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Auth", authSchema, "auth");
