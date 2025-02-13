import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
	{
		id: Number,
		title: String,
		description: String,
		date: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
