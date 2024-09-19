import mongoose from "mongoose";
import { emailRegex, passwordRegex } from "../../utils/other.js";
import { bookMark } from "../bookmark/bookmark.js";

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
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "User",
      enum: ["Admin", "User"],
    },
    profile:{
      type:String,
    }
  },
  { timestamps: true }
);


authSchema.post('save',async function(doc,next) {
  try {
    console.log("Document saved:", doc);

    const newBookMark = await bookMark.create({
      userId: doc._id
    });

    console.log("Bookmark Document Created for user", doc._id, newBookMark);

    next();
  } catch (error) {
    console.error("Error creating bookmark:", error);
    next(error); // Pass the error to the next middleware
  }
});

authSchema.pre('remove',async function(doc,next){

  try{
    const deleteData = await bookMark.findByIdAndDelete({userId:doc.userId});
    console,log("Bookmark for particular user deleted !!",deleteData);

  } catch (error) {
    console.error("Error deleting bookmark:", error);
  }

})
  
export default mongoose.model("Auth", authSchema, "auth");
