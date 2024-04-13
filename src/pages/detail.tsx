import { useLanguage } from "@hooks/useLanguage";
import { getCountry } from "@src/endpoints";
import type { CountriesType } from "@src/types/countries";
import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail: FC = () => {
	const { language, translate } = useLanguage();
	const [country, setCountry] = useState<CountriesType | undefined>();
	const params = useParams();
	const navigate = useNavigate();

	const countryName = language === "en" ? country?.name : country?.esName;
	const savedCountry = JSON.parse(localStorage.getItem("country") || "{}");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (params.id?.length !== 3) return navigate("/");
		if (
			!savedCountry ||
			!Object.keys(savedCountry).length ||
			savedCountry.code !== params.id
		) {
			getCountry(params.id).then((response) => {
				if (!response || (response as { message?: string }).message)
					navigate("/");
				localStorage.setItem("country", JSON.stringify(response));
				setCountry(response as CountriesType | undefined);
			});
		} else {
			setCountry(savedCountry);
		}
	}, []);

	return (
		country?.name && (
			<div className="p-4 h-[calc(100vh-200px)] bg-black rounded-lg shadow-md">
				<div
					className="h-full bg-cover bg-center rounded-lg"
					style={{
						backgroundImage: `url(${country?.flag})`,
						backgroundSize: "cover",
						opacity: 0.4,
					}}
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<div
						className="flex flex-col items-center justify-center p-4 sm:p-24 border rounded-lg shadow-md text-center bg-white text-black max-w-[250px] sm:max-w-full text-wrap"
						style={{ opacity: 0.7 }}
					>
						<h2 className="font-title text-[30px] sm:text-[50px] font-semibold mb-2 sm:mb-6">
							{countryName}
						</h2>
						<h4 className="mb-1">
							<span className="font-semibold">Capital: </span>
							{country?.capital}
						</h4>
						<p className="mb-1">
							<span className="font-semibold">
								{translate("details.continents", "Continents")}:{" "}
							</span>
							{country?.continents?.join(", ")}
						</p>
						<p className="mb-1">
							<span className="font-semibold">
								{translate("details.officialLanguages", "Official languages")}:{" "}
							</span>
							{country?.languages &&
								Object.values(country?.languages)?.join(", ")}
						</p>
						<p className="mb-1">
							<span className="font-semibold">
								{translate("details.population", "Population")}:{" "}
							</span>
							{country?.population}
						</p>
					</div>
				</div>
			</div>
		)
	);
};

export default Detail;
