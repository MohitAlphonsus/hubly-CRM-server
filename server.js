import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "./config/.env" });

import { connectDatabase } from "./config/db.js";
import teamRouter from "./routes/team.route.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import botSettingsRouter from "./routes/BotSettings.route.js";

const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => res.send("Hello from Express!"));
app.use(express.json());
app.use(cors());

app.use("/api/team", teamRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/bot", botSettingsRouter);

async function startServer() {
	await connectDatabase();
	app.listen(port, () => console.log(` Server started on port ${port}`));
}

startServer();
