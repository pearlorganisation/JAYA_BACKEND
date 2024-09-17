import mongoose, { Schema } from "mongoose";
const indianStates = [
    'andhra pradesh',
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
const userDataSchema = new Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        index:true,
        required:true
    },
    age:{
        type:Number,
        min:[1,"Min Value for the age must be 1"],
        max:[120,"Max Value for the age must be 120"],
        required:true
    },
    state:{
        type:String,
        enum:indianStates,
        required:true
    },
    category:{
        type:String,
        enum:['general','obc','sc','st','pvtg']
    },
    areaType:{
        type:String,
        enum:["rural",'urban','semiUrban','town']
    },
    speciableAbled:{
        type:String,
    },
    minority:{
        type:String
    },
    student:{
        type:String
    },
    employementStatus:{
        type:String,
        enum:["employed","unemployed"]
    },
    familyStatus:{
        type:String,
        enum:['BPL','APL','AAY','PHH']
    }

});

export const userData = new mongoose.model('UserDataForSchemes',userDataSchema)