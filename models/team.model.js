import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["admin", "team-member"],
			default: "team-member",
		},
		isPrimaryMessageReciever: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", teamSchema);

export default TeamMember;
