import express from "express";
const teamRouter = express.Router();

import { signup, login } from "../controllers/team.controller.js";

teamRouter.post("/signup", signup);
teamRouter.post("/login", login);
teamRouter.post("/switch-admin", (req, res) => { });

export default teamRouter;
