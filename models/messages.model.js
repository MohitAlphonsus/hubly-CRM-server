import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "TeamMember",
			required: true,
		},
		senderType: { type: String, required: true, enum: ["user", "team-member"] },
		fromTeamMember: { type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" },
		message: { type: String, required: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
