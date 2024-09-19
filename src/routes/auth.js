import express from "express";
import {
  deleteRole,
  getProfile,
  getRole,
  newRole,
  signin,
  signup,
  updateProfile,
} from "../controllers/auth.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/role").post(newRole).get(getRole);
router.route("/role/:id").delete(deleteRole);
router.route('/profile/:email').get(getProfile).patch(upload.single('profile'),updateProfile);
export default router;
