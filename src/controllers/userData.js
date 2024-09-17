import { userData } from "../models/userData/userData.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Create a new user data record
const createUserData = asyncHandler(async (req, res) => {
    const {userId} = req.body;

    if(!userId)
    {
        res.status(400).json({status:true,message:"Bad Request Provide User Id !!"}) ;
    }

    const user = new userData(req.body);
    await user.save();
    res.status(201).json({status:true,message:"User Data Created Successfully"}) ;
});

// Get all user data records
const getAllUserData = asyncHandler(async (req, res) => {
    const users = await userData.find();
    res.status(200).json({status:true,message:"Data Fetched Successfully",data:users});
});

// Get a single user data record by ID
const getUserDataById = asyncHandler(async (req, res) => {
    const user = await userData.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({status:true,message:"Data Fetched Successfully",data:user});
});

// Update a user data record by ID
const updateUserDataById = asyncHandler(async (req, res) => {
    const user = await userData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({status:true,message:"Data Fetched Successfully",data:user});
});

// Delete a user data record by ID
const deleteUserDataById = asyncHandler(async (req, res) => {
    const user = await userData.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).json({status:true,message:"Data Deleted Successfully"});
});

export {
    createUserData,
    getAllUserData,
    getUserDataById,
    updateUserDataById,
    deleteUserDataById
};
