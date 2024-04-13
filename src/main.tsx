import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { ThemeProvider } from "next-themes";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<BrowserRouter>
			<NextUIProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</NextUIProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
