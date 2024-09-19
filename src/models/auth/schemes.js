import mongoose from "mongoose";

const schemesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    miniTitle: { type: String, required: true },
    postedBy: { type: mongoose.Types.ObjectId, ref: "auth" },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: [],
    schemeBody:{
      type:String,
      required:true
    },
    schemeType:{
      type:String,
      enum:['gov','private','semi']
    }
    // blogImage: { type: String, required: true },

  },
  { timestamps: true }
);

export const Scheme =  mongoose.model('Scheme', schemesSchema);
