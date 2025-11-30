import express from "express";
const userRouter = express.Router();

import {
	startChat,
	getUserBySession,
	getUsers,
	getUserById,
	resolveTicket,
} from "../controllers/user.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

userRouter.post("/chat", startChat);
userRouter.get("/session/:sessionToken", getUserBySession);
userRouter.get("/all", protectRoute, getUsers);
userRouter.get("/:id", protectRoute, getUserById);
userRouter.put("/:userId/resolve", protectRoute, resolveTicket);

export default userRouter;
