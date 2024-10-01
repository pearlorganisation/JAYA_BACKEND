import mongoose, { Schema } from "mongoose";
const indianStates = [
  "Andhra pradesh",
  "Arunachal pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "sikkim",
  "Tamil nadu",
  "Telangana",
  "Tripura",
  "Uttar pradesh",
  "Uttarakhand",
  "West bengal",
];
const userDataSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    index: true,
    required: true,
  },
  age: {
    type: Number,
    min: [1, "Min Value for the age must be 1"],
    max: [120, "Max Value for the age must be 120"],
    required: true,
  },
  states: {
    type: String,
    enum: indianStates,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Transgender"],
  },
  caste: {
    type: String,
    enum: [
      "General",
      "Other backward class(OBC)",
      "Particularly vulnerable tribal(PVTG)",
      "Scheduled caste(SC)",
      "Scheduled tribe(ST)",
    ],
  },
  residence: {
    type: String,
    enum: ["Rural", "Urban", "SemiUrban", "Town"],
  },
  differentlyAbled: {
    type: String,
  },
  minority: {
    type: String,
  },
  student: {
    type: String,
  },
  employed: {
    type: String,
    enum: ["Employed", "Unemployed"],
  },
  bpl: {
    type: String,
    enum: ["Yes", "No", "BPL", "APL", "AAY", "PHH"],
  },
});

export const userData = new mongoose.model(
  "UserDataForSchemes",
  userDataSchema
);
