import express from "express";
const botSettingsRouter = express.Router();

import {
	getBotSettings,
	updateBotSettings,
} from "../controllers/botsettings.controller.js";

botSettingsRouter.get("/settings", getBotSettings);
botSettingsRouter.post("/settings", updateBotSettings);

export default botSettingsRouter;
