import Layout from "@components/layout";
import { Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import type { FC } from "react";

const App: FC = () => (
	<Layout className="bg-default-100 min-h-screen">
		<Routes>
			<Route path="/" element={<Home />} />
		</Routes>
	</Layout>
);

export default App;
