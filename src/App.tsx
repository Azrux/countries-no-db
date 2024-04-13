import Card from "@common-components/card";
import Layout from "@components/layout";
import { getCountries } from "./endpoints";

function App() {
	const data = getCountries();

	return (
		<Layout className="bg-default-100 min-h-screen">
			<Card
				name="Argentina"
				capital="Buenos Aires"
				image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png"
				onButtonClick={() => alert("Argentina")}
			/>
		</Layout>
	);
}

export default App;
