import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role field is required"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("role", roleSchema, "role");
