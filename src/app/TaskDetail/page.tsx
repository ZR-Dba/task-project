"use client";

import { useSearchParams } from "next/navigation";

function TaskDetail() {
	const param = useSearchParams();
	const fullDescription = param.get("description");
	const id = param.get("id");
	return (
		<>
			<div className="flex flex-col border rounded-xl p-4 m-8 m-auto">
				<span className="text-red-500">Detail - Task {id} :</span>{fullDescription}
			</div>
		</>
	);
}

export default TaskDetail;
