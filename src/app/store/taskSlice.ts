import { createSlice } from "@reduxjs/toolkit";

let initState: any = [
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

export const taskSlice = createSlice({
	name: "Task",
	initialState: initState,
	reducers: {
		setTask: (state, action) => {
			return (state = action.payload);
		},
		addTask: (state, action) => {
			state.push({
				id: state.length + 1,
				title: action.payload.title,
				description: action.payload.description,
				date: action.payload.date,
			});
		},
		deleteTask: (state, action) => {
			console.log("action/delete", action);
			return state.filter((task: any) => task.id !== action.payload);
		},
		editTask: (state, action) => {
			console.log("action/edit", action);
			const foundTask = state.find(
				(task: any) => task.id === action.payload.id
			);
			console.log("foundTask", foundTask);
			if (foundTask) {
				foundTask.title = action.payload.title;
				foundTask.description = action.payload.description;
				foundTask.date = action.payload.date;
			}
		},
	},
});

export const { addTask, deleteTask, setTask, editTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
