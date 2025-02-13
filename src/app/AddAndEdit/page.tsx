"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../store/taskSlice";

function AddAndEditTask() {
	const init = useSelector((state: any) => state.taskStore);
	const searchParams = useSearchParams();
	const paramType = searchParams.get("type");
	const id = searchParams.get("id");
	const taskTitle = searchParams.get("title");
	const taskDesc = searchParams.get("description");
	const [title, setTitle] = useState("");
	const [description, setDes] = useState("");
	const [updated, setUpdated] = useState(false);
	const [d, setd] = useState(false);
	const navigate = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (paramType === "edit") {
			setTitle(taskTitle || "");
			setDes(taskDesc || "");
		}
	}, [paramType, taskTitle, taskDesc]);

	const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (paramType === "add") {
			await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					description,
					date: new Date().toLocaleDateString(),
				}),
			});

			dispatch(
				addTask({
					title,
					description,
					date: new Date().toLocaleDateString(),
				})
			);
		} else {
			console.log("1")
			console.log("id",id);
			const response = await fetch(`/api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					description: description,
				}),
			});
			const data = await response.json();
			setUpdated(true)
			dispatch(
				editTask({
					id: id,
					title: data.title,
					description: data.description,
					date: new Date().toLocaleDateString(),
				})
			);
		}
		navigate.push("/");
	};

	return (
		<>
			<form
				onSubmit={handleAddTask}
				className="flex flex-col max-w-sm border rounded-xl p-4 my-4 m-auto"
			>
				<div className="my-2">
					{" "}
					<input
						type="text"
						name="title"
						placeholder="Enter Task title"
						className="mb-2 text-gray-500"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className="text-gray-500"
						aria-describedby="emailHelp"
						placeholder="Enter Task description"
						value={description}
						onChange={(e) => setDes(e.target.value)}
					/>
				</div>
				<div className="mb-3 form-check"></div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					{paramType === "add" ? "Add Task" : "Edit Task"}
				</button>
			</form>
		</>
	);
}

export default AddAndEditTask;
