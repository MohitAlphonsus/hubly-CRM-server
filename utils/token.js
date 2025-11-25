import jwt from "jsonwebtoken";

export function generateToken(id) {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
}

export function generateSessionToken() {
	return Date.now().toString(36) + Math.random().toString(36);
}
