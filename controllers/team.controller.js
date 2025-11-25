import TeamMember from "../models/team.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export async function signup(req, res) {
	try {
		const { firstName, lastName, email, password } = req.body;
		console.log(req.body);
		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const doesTeamMemberExist = await TeamMember.findOne({ email });
		if (doesTeamMemberExist) {
			return res
				.status(400)
				.json({ message: "Team member with email already exists" });
		}

		const teamMemberCount = await TeamMember.countDocuments();
		const isPrimaryMessageReciever = teamMemberCount === 0;

		const role = isPrimaryMessageReciever ? "admin" : "team-member";


		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const teamMember = new TeamMember({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			isPrimaryMessageReciever,
			role
		});

		await teamMember.save();
		const token = generateToken(teamMember._id);

		res.status(201).json({
			message: "Team member registered successfully",
			success: true,
			token,
			teamMember,
		});
	} catch (err) {
		res.status(500).json({ message: "Internal server error", success: false });
	}
}

export async function login(req, res) {
	try {
		const { email, password } = req.body;

		const teamMember = await TeamMember.findOne({ email });
		if (!teamMember) {
			return res
				.status(404)
				.json({ message: "Team member not found", success: false });
		}

		const isPasswordValid = await bcrypt.compare(password, teamMember.password);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ message: "Invalid email or password", success: false });
		}

		const token = generateToken(teamMember._id);

		res.status(200).json({
			message: "Logged in successfully",
			success: true,
			token,
			teamMember,
		});
	} catch (err) {
		res.status(500).json({ message: "Internal server error", success: false });
	}
}
