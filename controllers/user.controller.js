import { generateSessionToken } from "../utils/token.js";
import User from "../models/user.model.js";
import Message from "../models/messages.model.js";

export async function startChat(req, res) {
	try {
		const { name, email, mobile } = req.body;

		if (!name || !email || !mobile) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const sessionToken = generateSessionToken();

		const newUser = new User({
			name,
			email,
			mobile,
			sessionToken,
		});

		await newUser.save();

		res.status(201).json({
			message: "User registered successfully",
			success: true,
			user: newUser,
		});
	} catch (err) {
		console.log(`Start Chat ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}

export async function getUsers(req, res) {
	try {
		const users = await User.find().sort({ createdAt: -1 });

		const usersWithLastMessage = await Promise.all(
			users.map(async (user) => {
				const lastMessage = await Message.findOne({ userId: user._id })
					.sort({ createdAt: -1 })
					.lean();

				return {
					...user.toObject(),
					latestMessage: lastMessage ? lastMessage.message : null,
				};
			})
		);

		res.status(200).json({
			message: "Fetched all users",
			success: true,
			users: usersWithLastMessage,
		});
	} catch (err) {
		console.log(`Get All users error ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}

export async function getUserById(req, res) {
	try {
		const { id } = req.params;
		const user = await User.findById({ _id: id });
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found", success: false });
		}
		res.status(200).json({ message: "User found", success: true, user });
	} catch (err) {
		console.log(`Get User By Id ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}

export async function getUserBySession(req, res) {
	try {
		const { sessionToken } = req.body;
		const user = await User.findOne({ sessionToken });

		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found", success: false });
		}

		res.status(200).json({ message: "User found", success: true, user });
	} catch (err) {
		console.log(`Get User By Session ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}
