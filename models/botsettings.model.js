import mongoose from "mongoose";

const BotSettingsSchema = new mongoose.Schema({
	headerColor: { type: String, default: "#33475B" },
	backgroundColor: { type: String, default: "#EEEEEE" },
	customMessages: {
		type: [String],
		default: ["How can I help you?", "Ask me anything!"],
	},
	introductionForm: {
		name: { type: String, default: "Your Name" },
		phone: { type: String, default: "+1 (000) 000-0000" },
		email: { type: String, default: "example@gmail.com" },
	},
	welcomeMessage: {
		type: String,
		default:
			"Want to chat about Hubly? I'm an chatbot here to help you find your way.",
	},
	responseTimeLimit: { type: Number, default: 60 },
});

const BotSettings = mongoose.model("BotSettings", BotSettingsSchema);

export default BotSettings;
