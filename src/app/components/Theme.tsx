"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState(() =>
		typeof window !== "undefined"
			? localStorage.getItem("theme") || "light"
			: "light"
	);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<button
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className="p-2 m-4 bg-gray-500 dark:bg-gray-800 text-black dark:text-white rounded"
		>
			{theme === "light" ? "☀️" : "🌙"}
		</button>
	);
}
