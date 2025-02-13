import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an existing user
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    // console.log(user);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "User not found!" });
    }
    const token = generateAuthToken(user);
    console.log(token);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to generate JWT token
export const generateAuthToken = (user) => {
  const payload = {
    userId: user._id, // Store the user's ID or any relevant info
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
  return token;
};
