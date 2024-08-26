import express from "express";
import {
  deleteRole,
  getRole,
  newRole,
  signin,
  signup,
} from "../controllers/auth.js";
const router = express.Router();
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/role").post(newRole).get(getRole);
router.route("/role/:id").delete(deleteRole);
export default router;
