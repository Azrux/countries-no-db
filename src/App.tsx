import Layout from "@components/layout";
import { useLanguage } from "@hooks/useLanguage";

function App() {
	const { translate } = useLanguage();

	const text = translate("app.welcome", "Oi");

	return (
		<Layout className="bg-default-100 min-h-screen">
			<div>{text}</div>
		</Layout>
	);
}

export default App;
