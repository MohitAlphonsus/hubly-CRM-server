import jwt from "jsonwebtoken";
import TeamMember from "../models/team.model.js";

export async function protectRoute(req, res, next) {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res
			.status(401)
			.json({ message: "Not authorized to access this route", success: false });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const teamMember = await TeamMember.findById(decoded.id).select(
			"-password"
		);

		if (!teamMember) {
			return res
				.status(401)
				.json({ message: "Not authorized, User not found", success: false });
		}

		req.teamMember = teamMember;
		next();
	} catch (err) {
		return res
			.status(401)
			.json({ message: "Not authorized to access this route", success: false });
	}
}
