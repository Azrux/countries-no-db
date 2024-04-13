import Layout from "@components/layout";
import { useLanguage } from "@hooks/useLanguage";

function App() {
	const { translate } = useLanguage();

	const text = translate("app.welcome", "Oi");

	return (
		<Layout>
			<div>{text}</div>
		</Layout>
	);
}

export default App;
