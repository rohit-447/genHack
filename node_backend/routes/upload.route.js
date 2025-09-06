import express from "express";
import multer from "multer";
import { handleFileUpload, chatController } from "../controllers/upload.controller.js";

const router = express.Router();

// Multer setup → store file in memory (not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: POST /api/upload
router.post("/upload", upload.single("file"), handleFileUpload);
router.post("/chat", chatController)

export default router;
