import express from "express";
import {
  deleteSchemes,
  getAllSchemes,
  newSchemes,
} from "../controllers/govermentSchemes.js";
const router = express.Router();

router.route("/").get(getAllSchemes).post(newSchemes);
router.route("/:id").delete(deleteSchemes);

export default router;
