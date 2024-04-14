import { useNavigate } from "react-router-dom";
import PlanetSad from "@assets/planet-sad.png";
import { Button } from "@nextui-org/react";
import { useLanguage } from "@hooks/useLanguage";

const NotFound = () => {
	const navigate = useNavigate();
	const { translate } = useLanguage();

	return (
		<div className="flex flex-col items-center justify-center">
			<img src={PlanetSad} alt="Error" className="md:w-[350px]" />
			<h1 className="text-2xl font-bold mb-2">
				{translate("notFound.title", "Oops, something went wrong")}
			</h1>
			<p className="text-gray-600 mb-4">
				{translate(
					"notFound.description",
					"The page you're looking for doesn't exist.",
				)}
			</p>
			<Button onClick={() => navigate("/")} color="danger">
				{translate("notFound.button", "Go Home")}
			</Button>
		</div>
	);
};

export default NotFound;
