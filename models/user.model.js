import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		mobile: { type: Number, required: true },
		sessionToken: { type: String, unique: true, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
