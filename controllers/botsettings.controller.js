import BotSettings from "../models/botsettings.model.js";

export async function getBotSettings(req, res) {
	try {
		let botSettings = await BotSettings.findOne();

		if (!botSettings) {
			botSettings = await BotSettings.create({});
		}

		return res.status(200).json({ botSettings, success: true });
	} catch (err) {
		console.log(`Error in Get Bot Settings ${err}`);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
}

export async function updateBotSettings(req, res) {
	try {
		const updates = req.body;

		const updatedBotSettings = await BotSettings.findOneAndUpdate(
			{},
			{ $set: updates },
			{ new: true, upsert: true }
		);
		return res
			.status(200)
			.json({ botSettings: updatedBotSettings, success: true });
	} catch (err) {
		console.log(`Error in Update Bot Settings ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}
