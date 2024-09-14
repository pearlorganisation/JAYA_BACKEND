import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema(
  {
    documentTitle: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "auth", required: false },
    name: { type: String, required: true },
    document: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("document", documentsSchema);
