import express from "express";
import {
  createWallpaper,
  getAllWallpapers,
  getWallpaperById,
  updateWallpaper,
  deleteWallpaper,
  searchWallpapers,
} from "../controllers/WallpaperController.js";
import upload from "../middlewares/uploadMiddleware.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Upload wallpaper
router.post(
  "/wallpapers",
  authenticate,
  upload.single("image"),
  createWallpaper
);

// Get all wallpapers
router.get("/wallpapers", getAllWallpapers);

// Get wallpaper by ID
router.get("/wallpapers/:id", getWallpaperById);

// Update wallpaper
router.put(
  "/wallpapers/:id",
  authenticate,
  upload.single("image"),
  updateWallpaper
);

// Delete wallpaper
router.delete("/wallpapers/:id", authenticate, deleteWallpaper);

// Route for searching wallpapers
router.get("/wallpaper/search", authenticate, searchWallpapers);

export default router;
