import HomeSkeleton from "@components/home/skeleton";
import { useEffect, useState } from "react";
import { getCountries } from "@src/endpoints";
import Card from "@common-components/card";
import { Pagination } from "@nextui-org/react";
import type { CountriesType } from "@src/types/countries";
import { useLanguage } from "@hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import SortAndFilters from "@components/home/sorts-and-filters";

const Home = () => {
	const [countries, setCountries] = useState<CountriesType[] | undefined>();
	const [filteredCountries, setFilteredCountries] = useState<
		CountriesType[] | undefined
	>();
	const [currentPage, setCurrentPage] = useState(1);
	const { language } = useLanguage();
	const [countriesChanged, setCountriesChanged] = useState(false);
	const navigate = useNavigate();

	const countriesPerPage = 10;
	const totalCountries = filteredCountries
		? Math.ceil(filteredCountries?.length / countriesPerPage)
		: 0;

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = filteredCountries?.slice(
		indexOfFirstCountry,
		indexOfLastCountry,
	);

	const saveCountry = (country: CountriesType) => {
		localStorage.setItem("country", JSON.stringify(country));
		navigate(`/detail/${country.code}`);
	};

	useEffect(() => {
		getCountries().then((response) => {
			if (!response || !response.length) return;
			setCountries(response);
			setFilteredCountries(response);
		});
	}, []);

	// force re-render on array change
	useEffect(() => {
		if (countriesChanged) {
			setCountriesChanged(false);
		}
	}, [countriesChanged]);

	return countries ? (
		<div className="flex flex-col items-center justify-center gap-4">
			<SortAndFilters
				countries={countries}
				filteredCountries={filteredCountries}
				setFilteredCountries={setFilteredCountries}
				setCountriesChanged={setCountriesChanged}
			/>
			<div className="flex flex-wrap gap-10 items-center justify-center pb-16 sm:pb-6">
				{currentCountries?.map((country) => (
					<Card
						key={country?.code}
						name={language === "en" ? country?.name : country?.esName}
						capital={country?.capital}
						image={country?.flag}
						alt={country?.altImg}
						onButtonClick={() => saveCountry(country)}
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
