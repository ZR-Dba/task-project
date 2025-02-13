import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Task from "../../../models/task";

let tasks: any = [];

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	console.log("2-id", id);
	const { title, description } = await req.json();
	console.log("2-title", title);
	console.log("2-description", description);
	await connectMongoDB();
	await Task.findOneAndUpdate({ id: id }, { title, description });
	const taskIndex = tasks.findIndex((task: any) => task.id === parseInt(id));
	console.log("taskIndex", taskIndex);

	if (taskIndex !== -1) {
		tasks[taskIndex] = { id, title, description };
		return NextResponse.json(tasks[taskIndex]);
	}

	return NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	console.log("DELETE request received");
	const { id } = params;
	console.log("id", id);
	await connectMongoDB();
	const t = await Task.findOneAndDelete({ id: id });
	console.log("t", t);
	tasks = tasks.filter((task: any) => task.id !== parseInt(id));
	return NextResponse.json({ message: "Task deleted successfully" });
}
