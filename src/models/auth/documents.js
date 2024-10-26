import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema(
  {
    documentsCollection: [{ title: { type: String }, path: { type: String } }],
    user: { type: mongoose.Types.ObjectId, ref: "auth", required: false },
    name: { type: String, required: true },
    // document: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("document", documentsSchema);
