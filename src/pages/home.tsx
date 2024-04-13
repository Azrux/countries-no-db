import HomeSkeleton from "@components/home/skeleton";
import { useEffect, useState } from "react";
import { getCountries } from "@src/endpoints";
import Card from "@common-components/card";
import { Pagination } from "@nextui-org/react";
import type { CountriesType } from "@src/types/countries";
import { useLanguage } from "@hooks/useLanguage";

const Home = () => {
	const [countries, setCountries] = useState<CountriesType[] | undefined>();
	const [currentPage, setCurrentPage] = useState(1);
	const { language } = useLanguage();

	const countriesPerPage = 10;
	const totalCountries = countries
		? Math.ceil(countries?.length / countriesPerPage)
		: 0;

	useEffect(() => {
		getCountries().then((response) => {
			if (!response || !response.length) return;
			setCountries(response);
		});
	}, []);

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = countries?.slice(
		indexOfFirstCountry,
		indexOfLastCountry,
	);

	return countries ? (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex flex-wrap gap-10 items-center justify-center pb-16 sm:pb-6">
				{currentCountries?.map((country) => (
					<Card
						key={country.code}
						name={language === "en" ? country.name : country.esName}
						capital={country.capital}
						image={country.flag}
						alt={country.altImg}
						onButtonClick={() => {}}
					/>
				))}
			</div>
			<div className="flex fixed bottom-0 bg-default-50 w-full items-center justify-center border-t-2 border-danger-200 z-30 pt-2 pb-8 sm:pb-6">
				<Pagination
					showControls
					total={totalCountries}
					initialPage={1}
					page={currentPage}
					onChange={setCurrentPage}
					color="danger"
				/>
			</div>
		</div>
	) : (
		<HomeSkeleton />
	);
};

export default Home;
