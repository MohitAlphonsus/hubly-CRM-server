import express from "express";
const userRouter = express.Router();

import {
	startChat,
	getUserBySession,
	getUsers,
	getUserById,
} from "../controllers/user.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

userRouter.post("/chat", startChat);
userRouter.get("/session/:sessionToken", getUserBySession);
userRouter.get("/all", protectRoute, getUsers);
userRouter.get("/:id", protectRoute, getUserById);

export default userRouter;
