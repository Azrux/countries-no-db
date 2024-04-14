import Layout from "@components/layout";
import { Route, Routes } from "react-router-dom";
import Home from "@pages/home";
import type { FC } from "react";
import Detail from "@pages/detail";
import NotFound from "@pages/not-found";

const App: FC = () => (
	<Layout className="bg-default-100 min-h-screen">
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/detail/:id" element={<Detail />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</Layout>
);

export default App;
