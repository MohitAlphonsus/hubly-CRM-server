import express from "express";
const messageRouter = express.Router();

import {
	userMessage,
	userMessagesById,
	adminMessage,
	getMessages,
	getUserMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

messageRouter.post("/user", userMessage);
messageRouter.get("/user", getUserMessages);
messageRouter.post("/admin", protectRoute, adminMessage);
messageRouter.get("/admin/:userId", protectRoute, userMessagesById);
messageRouter.get("/all", protectRoute, getMessages);

export default messageRouter;
