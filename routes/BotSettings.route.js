import express from "express";
const botSettingsRouter = express.Router();

import {
	getBotSettings,
	updateBotSettings,
} from "../controllers/botsettings.controller.js";

botSettingsRouter.get("/settings", getBotSettings);
botSettingsRouter.put("/settings", updateBotSettings);

export default botSettingsRouter;
