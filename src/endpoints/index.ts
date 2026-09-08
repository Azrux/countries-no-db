import countries from "@src/data/countries.json";
import type { CountriesType } from "@src/types/countries";

// The app used to call restcountries.com/v3.1, which was shut down. The country
// data now lives in a static snapshot (src/data/countries.json, regenerated with
// `npm run build:data`), so these stay async only to keep their call sites intact.

const dataset = countries as unknown as CountriesType[];

export const getCountries = async (): Promise<CountriesType[]> => dataset;

export const getCountry = async (code: string): Promise<CountriesType | null> =>
	dataset.find(
		(country) => country.code.toLowerCase() === code.toLowerCase(),
	) ?? null;
