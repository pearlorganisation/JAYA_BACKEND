import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Scheme } from "../models/auth/schemes.js";




// Create a new scheme
export const createScheme = asyncHandler(async (req, res) => {
  const { title, miniTitle, postedBy, tags, schemeBody, schemeType ,eligibilityCriteria} = req.body;

  console.log("sfsafsa",req.body);

  const scheme = new Scheme({
    title,
    miniTitle,
    postedBy,
    tags:tags||[],
    schemeBody,
    schemeType,
    eligibilityCriteria
  });

  const createdScheme = await scheme.save();
  res.status(201).json({status:true,message:"Scheme Created Successfully !!",data:createdScheme});
});

// Get all schemes
export const getSchemes = asyncHandler(async (req, res) => {
    const { tags , page = 1, limit = 10 } = req.body;
    
    const skip = (page - 1) * limit;
  
    let query = {};
    
    if (tags && tags.length > 0) {
      query = { tags: { $in: tags } };
    }
    
    const [schemes, total] = await Promise.all([
      Scheme.find(query).skip(skip).limit(Number(limit)),
      Scheme.countDocuments(query)
    ]);
  
    res.status(200).json({
      status: true,
      message: "Schemes fetched successfully!",
      data: schemes,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
});

// Get a single scheme by ID
export const getSchemeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const scheme = await Scheme.findById(id);

  if (!scheme) {
    res.status(404).json({status:false,message:"Scheme not Found !!"});
  }

  res.status(200).json({status:true,message:"Scheme Fetched Successfully !!",data:scheme});
});

// Update a scheme by ID -- pending not reviewed
export const updateScheme = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, miniTitle, postedBy, tags, schemeBody, schemeType } = req.body;

  const scheme = await Scheme.findById(id);

  if (!scheme) {
    res.status(404);
    throw new Error('Scheme not found');
  }

  scheme.title = title || scheme.title;
  scheme.miniTitle = miniTitle || scheme.miniTitle;
  scheme.postedBy = postedBy || scheme.postedBy;
  scheme.tags = tags || scheme.tags;
  scheme.schemeBody = schemeBody || scheme.schemeBody;
  scheme.schemeType = schemeType || scheme.schemeType;

  const updatedScheme = await scheme.save();
  res.json(updatedScheme);
});

// Delete a scheme by ID
export const deleteScheme = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const scheme = await Scheme.findByIdAndDelete(id);

  if (!scheme) {
    res.status(404).json({status:false,message:"Scheme not Found !!"});
  }

  
  res.status(200).json({status:true,message:"Scheme Deleted !!"});
});
