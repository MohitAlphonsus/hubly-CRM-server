import mongoose from "mongoose";

export const connectDatabase = async () => {
	mongoose
		.connect("mongodb://localhost:27017/hubly-crm")
		.then(() => {
			console.log("Database connected");
		})
		.catch((err) => {
			console.log(err);
		});
};
