"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../components/Theme";
import { deleteTask, setTask } from "../store/taskSlice";

function TasksPage() {
	let newTasks = useSelector((state: any) => state.taskStore);
	const router = useRouter();
	const dispatch = useDispatch();
	const [update, isUpdate] = useState(true);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/tasks", {
					cache: "no-cache",
				});
				const tasksFromApi = await res.json();
				dispatch(setTask(tasksFromApi.tasks));
			} catch (error) {
				console.error("Error:", error);
			}
		};
		if (newTasks.length === 0) {
			fetchTasks();
		}
	}, [newTasks.length, dispatch]);

	const handleDeTailTask = (task: any) => {
		router.push(`/TaskDetail?id=${task.id}&description=${task.description}`);
	};

	const handleDeleteTask = async (id: number) => {
		await fetch(`/api/tasks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch(deleteTask(id));
	};

	const handleEditTask = (task: any) => {
		isUpdate(true);
		router.push(
			`/AddAndEdit?type=edit&id=${task.id}&title=${task.title}&description=${task.description}`
		);
	};

	return (
		<>
			<Theme />
			<div className="flex justify-center my-8">
				<button
					className="bg-red-500 text-white font-bold py-2 px-4 rounded"
					onClick={() => router.push("/AddAndEdit?type=add")}
				>
					Add New Task
				</button>
			</div>
			{newTasks.length > 0 &&
				newTasks.map((task: any) => (
					<div
						key={task.id}
						className="flex flex-col max-w-sm border rounded-xl p-4 my-4 m-auto"
					>
						<h4>
							<span className="text-yellow-500">Title: </span>
							{task.title}
						</h4>
						<div className="line-clamp-2 w-60 overflow-hidden text-ellipsis no-wrap">
							<span className="text-yellow-500">Description: </span>
							{task.description}
						</div>
						<div>
							<span className="text-yellow-500">Date-Modified: </span>
							{task.date}
						</div>
						<div className="flex justify-center gap-3 my-4">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => handleEditTask(task)}
							>
								Edit
							</button>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => handleDeleteTask(task.id)}
							>
								Delete
							</button>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => handleDeTailTask(task)}
							>
								Detail
							</button>
						</div>
					</div>
				))}
		</>
	);
}

export default TasksPage;
