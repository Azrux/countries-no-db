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
