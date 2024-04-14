import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useState, type FC } from "react";
import type { SortAndFiltersProps } from "./types";
import type { CountriesType } from "@src/types/countries";
import "./index.css";

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

		if (!sortType) {
			setFilteredCountries(
				// @ts-ignore
				filter
					? search
						? currentSearchedCountries
						: currentFilteredCountries
					: countries,
			);
			setCountriesChanged(true);
		} else {
			const item = filter
				? search
					? currentSearchedCountries
					: currentFilteredCountries
				: countries;

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
			<div className="flex items-center w-full sm:w-1/3">
				<Select
					id="sort"
					className="flex items-center w-full"
					label={translate("filters.sortLabel", "Sort by")}
					value="name"
					color="danger"
					size="sm"
					onChange={(e) => sortCountries(e.target.value)}
				>
					<SelectItem
						textValue={`${translate("filters.name", "Name")} AZ`}
						key="nameAZ"
						value="nameAZ"
						hideSelectedIcon
					>
						<div className="flex items-center justify-between">
							{translate("filters.name", "Name")} A-Z
							<div className="flex flex-col">
								<Icon icon="mingcute:az-sort-descending-letters-line" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={`${translate("filters.name", "Name")} ZA`}
						key="nameZA"
						value="nameZA"
						hideSelectedIcon
					>
						<div className="flex items-center justify-between">
							{translate("filters.name", "Name")} Z-A
							<div className="flex flex-col">
								<Icon icon="mingcute:za-sort-descending-letters-line" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue="capital A-Z"
						key="capitalAZ"
						value="capitalAZ"
						hideSelectedIcon
					>
						<div className="flex items-center justify-between">
							Capital A-Z
							<div className="flex flex-col">
								<Icon icon="mingcute:az-sort-descending-letters-line" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue="capital Z-A"
						key="capitalZA"
						value="capitalZA"
						hideSelectedIcon
					>
						<div className="flex items-center justify-between">
							Capital Z-A
							<div className="flex flex-col">
								<Icon icon="mingcute:za-sort-descending-letters-line" />
							</div>
						</div>
					</SelectItem>
				</Select>
			</div>
			<div className="flex items-center w-full sm:w-1/3">
				<Select
					id="filters"
					className="flex items-center w-full"
					label={translate("filters.filterLabel", "Filter by")}
					selectionMode="multiple"
					color="danger"
					size="sm"
					onChange={(e) => filterByContinent(e.target.value)}
				>
					<SelectItem
						textValue={translate("filters.africa", "Africa")}
						key="Africa"
						value="Africa"
					>
						<div className="flex items-center justify-between">
							{translate("filters.africa", "Africa")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={translate("filters.america", "America")}
						key="America"
						value="America"
					>
						<div className="flex items-center justify-between">
							{translate("filters.america", "America")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={translate("filters.asia", "Asia")}
						key="Asia"
						value="Asia"
					>
						<div className="flex items-center justify-between">
							{translate("filters.asia", "Asia")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={translate("filters.europe", "Europa")}
						key="Europe"
						value="Europe"
					>
						<div className="flex items-center justify-between">
							{translate("filters.europe", "Europa")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={translate("filters.oceania", "Oceania")}
						key="Oceania"
						value="Oceania"
					>
						<div className="flex items-center justify-between">
							{translate("filters.oceania", "Oceania")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
					<SelectItem
						textValue={translate("filters.antarctica", "Antarctica")}
						key="Antarctica"
						value="Antarctica"
					>
						<div className="flex items-center justify-between">
							{translate("filters.antarctica", "Antarctica")}
							<div className="flex flex-col">
								<Icon icon="mdi:earth" />
							</div>
						</div>
					</SelectItem>
				</Select>
			</div>
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
