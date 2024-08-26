import mongoose from "mongoose";

const govermentSchemes = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, "Department is required!!"],
    },
    tags: {
      type: [],

      required: [true, "Tags is required!!"],
    },
    details: {
      type: String,
      required: [true, "details is required!!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("schemes", govermentSchemes, "schemes");
