import { NextResponse } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import Task from "../../models/task";

let tasks: any = [
	// {
	// 	id: 1,
	// 	title: "Task 1",
	// 	description: "des1",
	// 	date: new Date().toLocaleDateString(),
	// },
	// {
	// 	id: 2,
	// 	title: "Task 2",
	// 	description: "dessssss 2",
	// 	date: new Date().toLocaleDateString(),
	// },
];

export async function GET() {
	const tasks = await Task.find();
	return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
	const { title, description, date } = await req.json();
	await connectMongoDB();
	const newTask = {
		id: tasks.length + 1,
		title,
		description,
		date,
	};
	tasks.push(newTask);
	await Task.create(newTask);
	return NextResponse.json(newTask, { status: 201 });
}
