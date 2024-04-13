export interface PaginationProps {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalCountries: number;
	continents?: number;
}
