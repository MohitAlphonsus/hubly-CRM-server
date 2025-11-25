import User from "../models/user.model.js";
import TeamMember from "../models/team.model.js";
import Message from "../models/messages.model.js";

async function getAdmin() {
  let admin = await TeamMember.findOne({ role: "admin" });
  return admin;
}

export async function userMessage(req, res) {
  try {
    const { sessionToken, message } = req.body;

    const user = await User.findOne({ sessionToken });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const admin = await getAdmin();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    const newMessage = new Message({
      userId: user._id,
      assignedTo: admin._id,
      senderType: "user",
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", success: true, newMessage });

  } catch (err) {
    console.log(`Error in User Message ${err}`);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

export async function adminMessage(req, res) {
  try {
    const { userId, message } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const newMessage = new Message({
      userId,
      assignedTo: req.teamMember._id,
      senderType: "team-member",
      fromTeamMember: req.teamMember._id,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully", success: true, newMessage });

  } catch (err) {
    console.log(`Error in Admin Message ${err}`);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await Message.find({ assignedTo: req.teamMember._id });
    res.status(200).json({ messages, success: true });
  } catch (err) {
    console.log(`Error in Get Messages ${err}`);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}