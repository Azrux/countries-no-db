import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@nextui-org/react";
import { useState, type FC } from "react";
import type { SortAndFiltersProps } from "./types";
import type { CountriesType } from "@src/types/countries";
import "./index.css";
import Sort from "./components/sort";
import Filter from "./components/filter";

const SortAndFilters: FC<SortAndFiltersProps> = ({
	countries,
	filteredCountries,
	setFilteredCountries,
	setCountriesChanged,
}) => {
	const { translate, language } = useLanguage();
	const [currentSearch, setCurrentSearch] = useState<string>("");
	const [currentFilter, setCurrentFilter] = useState<string>("");
	const [currentSort, setCurrentSort] = useState<string>("");
	const [currentFilteredCountries, setCurrentFilteredCountries] = useState<
		CountriesType[] | undefined
	>();
	const [currentSearchedCountries, setCurrentSearchedCountries] = useState<
		CountriesType[] | undefined
	>();

	const sortCountries = (
		sortType: string,
		filter = !!currentFilter,
		search = !!currentSearch,
	) => {
		setCurrentSort(sortType);

		const item = filter
			? search
				? currentSearchedCountries
				: currentFilteredCountries
			: search
				? currentSearchedCountries
				: countries;

		if (!sortType) {
			item && setFilteredCountries(item);
			setCountriesChanged(true);
		} else {
			const sortedCountries =
				item &&
				([...item]?.sort((a, b) => {
					switch (sortType) {
						case "nameAZ":
							return language === "en"
								? a.name.localeCompare(b.name)
								: a.esName.localeCompare(b.esName);
						case "nameZA":
							return language === "en"
								? b.name.localeCompare(a.name)
								: b.esName.localeCompare(a.esName);
						case "capitalAZ":
							return a.capital?.localeCompare(b.capital);
						case "capitalZA":
							return b.capital?.localeCompare(a.capital);
						default:
							return 0;
					}
				}) as CountriesType[]);

			sortedCountries && setFilteredCountries(sortedCountries);
			setCountriesChanged(true);
		}
	};

	const filterByContinent = (continents: string) => {
		setCurrentFilter(continents);

		if (!continents) {
			setFilteredCountries(countries);
			searchByCountryName(currentSearch, !!continents);
		} else {
			const continentsArray = continents.split(",");

			const items = currentSort
				? currentFilteredCountries || filteredCountries
				: countries;

			const newFilteredCountries = items?.filter((country) => {
				return country.continents.some((continent) =>
					continentsArray.some((inputContinent) =>
						continent.includes(inputContinent.trim()),
					),
				);
			});

			newFilteredCountries && setFilteredCountries(newFilteredCountries);
			setCurrentFilteredCountries(newFilteredCountries);
			if (currentSearch) {
				searchByCountryName(currentSearch, !!continents, newFilteredCountries);
			} else {
				currentSort && sortCountries(currentSort, true);
				setCountriesChanged(true);
			}
		}
	};

	const searchByCountryName = (
		searchValue: string,
		filter?: boolean,
		countriesFromFilterFn?: CountriesType[],
	) => {
		setCurrentSearch(searchValue);

		if (!searchValue) {
			setFilteredCountries(
				filter && currentFilteredCountries
					? countriesFromFilterFn || currentFilteredCountries
					: countries,
			);
			currentSort && sortCountries(currentSort, filter, false);
			setCountriesChanged(true);
		} else {
			const items = filter
				? countriesFromFilterFn || currentFilteredCountries
				: countries;

			const searchedCountries = items?.filter((country: CountriesType) => {
				return language === "en"
					? country.name.toLowerCase().startsWith(searchValue.toLowerCase())
					: country.esName.toLowerCase().startsWith(searchValue.toLowerCase());
			}) as CountriesType[];

			setFilteredCountries(searchedCountries);
			setCurrentSearchedCountries(searchedCountries);
			currentSort && sortCountries(currentSort, filter, true);
			setCountriesChanged(true);
		}
	};

	return (
		<div className="flex flex-col md:flex-row items-center mb-6 gap-4 w-full justify-between">
			<Sort sortCountries={sortCountries} />
			<Filter filterByContinent={filterByContinent} />
			<div className="w-full sm:w-1/3">
				<Input
					placeholder={translate("filters.searchPlaceholder", "Search...")}
					endContent={<Icon icon="majesticons:search-circle" />}
					onChange={(e) => searchByCountryName(e.target.value, !!currentFilter)}
					color="danger"
					size="lg"
				/>
			</div>
		</div>
	);
};

export default SortAndFilters;
