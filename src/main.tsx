import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<BrowserRouter>
			<NextUIProvider>
				<App />
			</NextUIProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
