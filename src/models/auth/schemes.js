import mongoose from "mongoose";

const schemesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    postedBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
      },
    ],
    description: { type: String, required: true },
    blogImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("document", schemesSchema);
