import express from "express";
import {
  create,
  readFileById,
  read,
  deleteFile,
  update
} from "../controllers/fileController.js";
import upload from "../middleware/multerConfig.js";
import {authenticateToken} from "../middleware/authorization.js";

const router = express.Router();

router.post("/", authenticateToken, upload.single("file"), create);
router.get("/", authenticateToken, read);
router.get("/:id", authenticateToken, readFileById);
router.put("/:id", authenticateToken, update);

router.delete("/:id", authenticateToken, deleteFile);

export default router;
