import express from "express";
import { createUserData, deleteUserDataById, getAllUserData, getUserDataById, updateUserDataById } from "../controllers/userData.js";

const router = express.Router();
router.route('/')
.get(getAllUserData)
.post(createUserData);

router.route('/:id')
.get(getUserDataById)
.patch(updateUserDataById)
.delete(deleteUserDataById);

export const userDataRoutes = router;
