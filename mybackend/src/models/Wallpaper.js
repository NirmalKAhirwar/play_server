import mongoose from "mongoose";

const WallpaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallpaper = mongoose.model("Wallpaper", WallpaperSchema);
export default Wallpaper;
