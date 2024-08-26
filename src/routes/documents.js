import express from "express";
import { getAllDocuments, newDocument } from "../controllers/document.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router
  .route("/")
  .get(getAllDocuments)
  .post(upload.single("document"), newDocument);

export default router;
