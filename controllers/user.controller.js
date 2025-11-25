import { generateSessionToken } from "../utils/token.js";
import User from "../models/user.model.js";

export async function startChat(req, res) {
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sessionToken = generateSessionToken();

    const newUser = new User({
      name, email, mobile, sessionToken
    })

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: newUser
    });

  } catch (err) {
    console.log(`Start Chat ${err}`);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

export async function getUserBySession(req, res) {
  try {
    const { sessionToken } = req.body;
    const user = await User.findOne({ sessionToken });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User found", success: true, user });
  } catch (err) {
    console.log(`Get User By Session ${err}`);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}