import express from "express";
import {
  addDocuments,
  getAllDocuments,
  getAllDocumentsById,
  newDocument,
  removeDocuments,
} from "../controllers/document.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/")
  .get(getAllDocuments)
  .post(upload.single("document"), newDocument);

router.route("/:id").get(getAllDocumentsById);
router.route("/addDocument/:id").patch(upload.single("document"), addDocuments);

router.route("/removeDocuments/:id").patch(removeDocuments);

export default router;
