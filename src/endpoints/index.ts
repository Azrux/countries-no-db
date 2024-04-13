import axios from "axios";

export const getCountries = async () => {
	try {
		const response = await axios.get("https://restcountries.com/v3.1/all");
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const mappedData = response.data.map((country: any) => ({
			name: country.name.common,
			esName: country.translations.spa?.common || country.name.common,
			code: country.cca3,
			flag: country.flags.svg,
			altImg: country.flags.alt,
			population: country.population,
			continents: country.continents,
			languages: country.languages,
			capital: Array.isArray(country.capital)
				? country.capital[0]
				: country.capital,
		}));

		return mappedData;
	} catch (error) {
		return error;
	}
};

export const getCountry = async (code: string) => {
	try {
		const response = await axios.get(
			`https://restcountries.com/v3.1/alpha/${code}`,
		);

		const data = response.data[0];

		const mappedCountry = data
			? {
					name: data?.name?.common,
					esName: data?.translations?.spa?.common || data?.name?.common,
					code: data?.cca3,
					flag: data?.flags?.svg,
					altImg: data?.flags?.alt,
					population: data?.population,
					continents: data?.continents,
					languages: data?.languages,
					capital: Array.isArray(data?.capital)
						? data?.capital[0]
						: data?.capital,
				}
			: null;

		return mappedCountry;
	} catch (error) {
		return error;
	}
};
