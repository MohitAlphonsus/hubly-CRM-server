import express from "express";
const teamRouter = express.Router();

import {
	signup,
	login,
	addTeamMember,
	deleteTeamMember,
	editAndUpdateTeamMember,
	getAllTeamMembers,
} from "../controllers/team.controller.js";

teamRouter.post("/signup", signup);
teamRouter.post("/login", login);
teamRouter.post("/switch-admin", (req, res) => {});

teamRouter.post("/add", addTeamMember);
teamRouter.delete("/delete/:id", deleteTeamMember);
teamRouter.put("/update/:id", editAndUpdateTeamMember);
teamRouter.get("/all", getAllTeamMembers);

export default teamRouter;
