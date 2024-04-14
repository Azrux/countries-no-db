import type { CountriesType } from "@src/types/countries";

export interface PaginationProps {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalCountries: number;
	continents?: number;
}

export interface SortAndFiltersProps {
	countries: CountriesType[];
	filteredCountries?: CountriesType[];
	setFilteredCountries: (countries: CountriesType[]) => void;
	setCountriesChanged: (changed: boolean) => void;
}
