import Wallpaper from "../models/Wallpaper.js";
import path from "path";
import mongoose from "mongoose";

// Create a new wallpaper
export const createWallpaper = async (req, res) => {
  const { title, tags } = req.body;
  const uploader = req.user.userId;
  console.log(req.user.userId);
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  try {
    const newWallpaper = new Wallpaper({
      title,
      imageURL: `/uploads/${req.file.filename}`,
      tags: tags.split(","),
      uploader,
    });

    await newWallpaper.save();
    res.status(201).json({
      message: "Wallpaper created successfully",
      wallpaper: newWallpaper,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating wallpaper" });
  }
};

// Get all wallpapers
export const getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().populate(
      
      "uploader"
    );
    res.status(200).json({ wallpapers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error getting wallpapers" });
  }
};

// Get a wallpaper by ID
export const getWallpaperById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid wallpaper ID" });
  }

  try {
    const wallpaper = await Wallpaper.findById(id).populate(
      "uploader",
      "username email"
    );
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }
    res.status(200).json(wallpaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a wallpaper (title and tags)
export const updateWallpaper = async (req, res) => {
  const { id } = req.params;
  const { title, tags } = req.body;

  try {
    const updatedWallpaper = await Wallpaper.findByIdAndUpdate(
      id,
      { title, tags: tags.split(",") },
      { new: true }
    );
    if (!updatedWallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }
    res
      .status(200)
      .json({ message: "Wallpaper updated", wallpaper: updatedWallpaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a wallpaper
export const deleteWallpaper = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWallpaper = await Wallpaper.findByIdAndDelete(id);
    if (!deletedWallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }
    res.status(200).json({ message: "Wallpaper deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchWallpapers = async (req, res) => {
  try {
    const { title, tags } = req.query;
    console.log(req.query);
    // Build the query object
    let query = {};

    // Add title filter if specified
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    // Add tags filter if specified
    if (tags) {
      query.tags = { $in: tags.split(",") }; // Split comma-separated tags and find wallpapers with any of them
    }

    // Use MongoDB Aggregation to query wallpapers
    const wallpapers = await Wallpaper.aggregate([
      {
        $match: query, // Match the filters (title and tags)
      },
      {
        $project: {
          title: 1, // Include title in the result
          imageURL: 1, // Include image URL in the result
          tags: 1, // Include tags in the result
          uploader: 1, // Include uploader in the result
          createdAt: 1, // Include creation date in the result
        },
      },
    ]);

    // Return the found wallpapers
    res.status(200).json(wallpapers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error searching wallpapers", error });
  }
};
