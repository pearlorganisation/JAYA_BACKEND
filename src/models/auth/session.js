import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Types.ObjectId,
      required: [true, "session id is required!!"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id is required!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("loginSession", sessionSchema);
