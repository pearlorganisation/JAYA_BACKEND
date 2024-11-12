import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../utils/other.js";
import { bookMark } from "../bookmark/bookmark.js";

// Define your regex patterns as RegExp objects
import { isValidPhoneNumber } from "libphonenumber-js";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [8, "username should of length 8 or greater than 8 !!"],
    },
    email: {
      type: String,
      required: true,

      match: [emailRegex, "Invalid email!! Please try again"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password should of length 8 or greater than 8 !!"],
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: [
        {
          // Check if the phone number is exactly 10 digits
          validator: function (value) {
            // Remove non-numeric characters (e.g., spaces, hyphens)
            const cleanedNumber = value.replace(/\D/g, "");

            // Check if the number is exactly 10 digits
            return cleanedNumber.length === 10;
          },
          message: "Phone number must be exactly 10 digits long.",
        },
        {
          // Validate using libphonenumber-js for India ('IN')
          validator: function (value) {
            // Remove non-numeric characters (e.g., spaces, hyphens)
            const cleanedNumber = value.replace(/\D/g, "");

            // Validate using libphonenumber-js
            return isValidPhoneNumber(cleanedNumber, "IN");
          },
          message:
            "Invalid phone number format. Please provide a valid Indian number.",
        },
      ],
    },
    role: {
      type: String,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

authSchema.post("save", async function (doc, next) {
  try {
    console.log("Document saved:", doc);

    if (!doc.isNew) {
      next();
    }
    const newBookMark = await bookMark.create({
      userId: doc._id,
    });

    console.log("Bookmark Document Created for user", doc._id, newBookMark);

    next();
  } catch (error) {
    console.error("Error creating bookmark:", error);
    next(error); // Pass the error to the next middleware
  }
});

authSchema.pre("remove", async function (doc, next) {
  try {
    const deleteData = await bookMark.findByIdAndDelete({ userId: doc.userId });
    console, log("Bookmark for particular user deleted !!", deleteData);
  } catch (error) {
    console.error("Error deleting bookmark:", error);
  }
});

export default mongoose.model("Auth", authSchema, "auth");
