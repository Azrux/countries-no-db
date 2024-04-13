/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
	content: [
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/daisyui/dist/**/*.js",
		"node_modules/react-daisyui/dist/**/*.js",
	],
	theme: {
		extend: {},
		fontFamily: {
			title: ["Kaushan Script", "cursive"],
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
