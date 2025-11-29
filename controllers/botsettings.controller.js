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
		const { botSettings } = req.body;
		const settings = await BotSettings.findOneAndUpdate(
			{},
			{ $set: botSettings },
			{ new: true, upsert: true }
		);
		res.status(200).json({ settings, success: true });
	} catch (err) {
		console.log(`Error in Update Bot Settings ${err}`);
		res.status(500).json({ message: "Internal server error", success: false });
	}
}
