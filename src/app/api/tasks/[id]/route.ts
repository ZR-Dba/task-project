import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Task from "../../../models/task";

let tasks: any = [];

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	const { title, description } = await req.json();
	await connectMongoDB();
	await Task.findOneAndUpdate({ id: id }, { title, description });
	const taskIndex = tasks.findIndex((task: any) => task.id === parseInt(id));

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
	const { id } = params;
	await connectMongoDB();
	 await Task.findOneAndDelete({ id: id });
	tasks = tasks.filter((task: any) => task.id !== parseInt(id));
	return NextResponse.json({ message: "Task deleted successfully" });
}
