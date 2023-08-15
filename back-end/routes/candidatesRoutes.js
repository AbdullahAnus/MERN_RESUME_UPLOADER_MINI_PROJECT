import CandidateProfileController from "../controllers/candidateProfileController.js";
import express from "express";
import upload from "../middlewares/uploade-middleware.js";
const router = express.Router();
upload;

// Route level middleware - For Parsing multipart/form-data
router.use(
  "/resume",
  upload.fields([
    { name: "pimage", maxCount: 1 },
    { name: "rdoc", maxCount: 1 },
  ])
);

// Public Routes
router.post("/resume", CandidateProfileController.saveProfile);
router.get("/list", CandidateProfileController.profileList);

export default router;
