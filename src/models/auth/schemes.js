import mongoose from "mongoose";
const indianStates = ['andhra pradesh',
  'arunachal pradesh',
  'assam',
  'bihar',
  'chhattisgarh',
  'goa',
  'gujarat',
  'haryana',
  'himachal pradesh',
  'jharkhand',
  'karnataka',
  'kerala',
  'madhya pradesh',
  'maharashtra',
  'manipur',
  'meghalaya',
  'mizoram',
  'nagaland',
  'odisha',
  'punjab',
  'rajasthan',
  'sikkim',
  'tamil nadu',
  'telangana',
  'tripura',
  'uttar pradesh',
  'uttarakhand',
  'west bengal'
 ];

const eligibilitySchema = new mongoose.Schema({
  gender:{
    type:[String],
    enum:['M','F','T']
  },
  age:{
    minAge:{
      type:Number,
      min:[1,"Age Min Can be 1 year old !!"]
    },
    maxAge:{
      type:Number,
      max:[150,"Age max Can be 150 year old !!"]
    }
  },
  state:{
    type:[String],
    enum:indianStates
  },
  category:{
    type:[String],
    enum:['OBC','PVTG','SC','ST']
  },
  residence:{
    type:[String],
    enum:['urban','rural','semiurban']
  }


});

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
    },
    eligibilityCriteria:{
      type:eligibilitySchema
    }


  },
  { timestamps: true }
);

export const Scheme =  mongoose.model('Scheme', schemesSchema);
