import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Select, SelectItem } from "@nextui-org/react";
import type { FC } from "react";
import type { SortAndFiltersProps } from "./types";

const SortAndFilters: FC<SortAndFiltersProps> = ({
	countries,
	setCountries,
	setCountriesChanged,
}) => {
	const { translate, language } = useLanguage();

	const orderNameAZ = () => {
		const sortedCountries = countries?.sort((a, b) =>
			language === "en"
				? a.name.localeCompare(b.name)
				: a.esName.localeCompare(b.esName),
		);
		setCountries(sortedCountries);
		setCountriesChanged(true);
	};

	const orderNameZA = () => {
		const sortedCountries = countries?.sort((a, b) =>
			language === "en"
				? b.name.localeCompare(a.name)
				: b.esName.localeCompare(a.esName),
		);
		setCountries(sortedCountries);
		setCountriesChanged(true);
	};

	const orderCapitalAZ = () => {
		const sortedCountries = countries?.sort((a, b) =>
			a.capital?.localeCompare(b.capital),
		);
		setCountries(sortedCountries);
		setCountriesChanged(true);
	};

	const orderCapitalZA = () => {
		const sortedCountries = countries?.sort((a, b) =>
			b.capital?.localeCompare(a.capital),
		);
		setCountries(sortedCountries);
		setCountriesChanged(true);
	};

	const filterByContinent = (continents: string) => {
		console.log(continents);

		if (!continents) {
			setCountries(countries);
			setCountriesChanged(true);
		}

		const continentsArray = continents.split(",");
		const filteredCountries = countries?.filter((country) => {
			return country.continents.some((continent) =>
				continentsArray.some((inputContinent) =>
					continent.includes(inputContinent.trim()),
				),
			);
		});

		setCountries(filteredCountries);
		setCountriesChanged(true);
	};

	return (
		<div className="flex items-center justify-center w-full mb-6 gap-4">
			<div className="flex items-center w-[400px]">
				<Select
					id="sort"
					className="flex items-center w-full"
					label={translate("filters.sortLabel", "Sort by")}
					value="name"
					color="danger"
				>
					<SelectItem
						textValue={`${translate("filters.name", "Name")} AZ`}
						key="nameAZ"
						value="nameAZ"
						onClick={orderNameAZ}
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
						onClick={orderNameZA}
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
						onClick={orderCapitalAZ}
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
						onClick={orderCapitalZA}
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
			<div className="flex items-center w-[400px]">
				<Select
					id="filters"
					className="flex items-center w-full"
					label={translate("filters.filterLabel", "Filter by")}
					selectionMode="multiple"
					color="danger"
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
		</div>
	);
};

export default SortAndFilters;
