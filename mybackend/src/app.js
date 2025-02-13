import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import wallpaperRoutes from "./routes/wallpaperRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import path from "path";

// Initialize environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Fix for __dirname in ES Modules
const __dirname = path.resolve();

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(cors());
app.use(express.json());

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use wallpaper routes
app.use("/api", wallpaperRoutes);

// Export the app for use in other files (e.g., in server.js)
export default app;
