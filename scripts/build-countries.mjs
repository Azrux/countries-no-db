// Regenerates src/data/countries.json — a self-contained snapshot so the app
// needs no country API at runtime (restcountries.com shut down its free v3.1).
//
// Sources (all MIT / public, CORS-friendly, but only fetched here at build time):
//   - mledoze/countries      -> names, spanish translation, ISO codes, capital, languages
//   - samayo/country-json    -> population, continent
//   - flagcdn.com            -> flag image URL (built from the ISO alpha-2 code)
//
// Run: node scripts/build-countries.mjs

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MLEDOZE =
	"https://cdn.jsdelivr.net/gh/mledoze/countries@master/dist/countries.json";
const POPULATION =
	"https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json";
const CONTINENT =
	"https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json";

const OUT = join(
	dirname(fileURLToPath(import.meta.url)),
	"..",
	"src",
	"data",
	"countries.json",
);

// mledoze common name -> samayo name, for the cases plain normalisation misses.
const ALIASES = {
	"DR Congo": "Democratic Republic of the Congo",
	"Republic of the Congo": "Congo",
	Czechia: "Czech Republic",
	"Cape Verde": "Cabo Verde",
	"Ivory Coast": "Cote d'Ivoire",
	Eswatini: "Swaziland",
	"North Macedonia": "Macedonia",
	Myanmar: "Myanmar (Burma)",
	"Timor-Leste": "East Timor",
	"United States": "United States of America",
	Palestine: "Palestinian Territory",
	"Vatican City": "Vatican",
	Brunei: "Brunei Darussalam",
	Micronesia: "Federated States of Micronesia",
	"São Tomé and Príncipe": "Sao Tome and Principe",
	"Caribbean Netherlands": "Bonaire, Saint Eustatius and Saba",
	Fiji: "Fiji Islands",
	Türkiye: "Turkey",
};

// Real countries samayo's dataset omits entirely — filled by hand so the detail
// view still shows something sensible. Keyed by mledoze common name.
const SUPPLEMENT = {
	Taiwan: { population: 23570000, continent: "Asia" },
	Kosovo: { population: 1935000, continent: "Europe" },
	"Åland Islands": { population: 30000, continent: "Europe" },
	Jersey: { population: 103000, continent: "Europe" },
	Guernsey: { population: 63000, continent: "Europe" },
	"Isle of Man": { population: 85000, continent: "Europe" },
	Curaçao: { population: 155000, continent: "North America" },
	"Sint Maarten": { population: 44000, continent: "North America" },
	"Saint Martin": { population: 32000, continent: "North America" },
	"Saint Barthélemy": { population: 10000, continent: "North America" },
	"Caribbean Netherlands": { population: 27000, continent: "North America" },
};

const norm = (s) =>
	s
		.normalize("NFD") // accented letters -> base letter + combining mark
		.toLowerCase()
		.replace(/\(.*?\)/g, "")
		.replace(/[^a-z0-9]+/g, " ") // also drops the combining marks (non-ASCII)
		.replace(/\bthe\b/g, "")
		.replace(/\bsaint\b/g, "st")
		.trim();

const fetchJson = async (url) => {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
	return res.json();
};

const buildIndex = (rows, key) => {
	const map = new Map();
	for (const row of rows) map.set(norm(row.country), row[key]);
	return map;
};

const lookup = (map, country) => {
	const alias = ALIASES[country.name.common];
	if (alias && map.has(norm(alias))) return map.get(norm(alias));
	if (map.has(norm(country.name.common)))
		return map.get(norm(country.name.common));
	for (const spelling of country.altSpellings ?? []) {
		if (map.has(norm(spelling))) return map.get(norm(spelling));
	}
	return undefined;
};

const REGION_TO_CONTINENT = {
	Africa: "Africa",
	Americas: "North America",
	Antarctic: "Antarctica",
	Asia: "Asia",
	Europe: "Europe",
	Oceania: "Oceania",
};

const main = async () => {
	const [countries, populations, continents] = await Promise.all([
		fetchJson(MLEDOZE),
		fetchJson(POPULATION),
		fetchJson(CONTINENT),
	]);

	const popIndex = buildIndex(populations, "population");
	const continentIndex = buildIndex(continents, "continent");

	const missing = { population: [], continent: [] };

	const data = countries
		.map((country) => {
			const cca2 = country.cca2?.toLowerCase();
			const capital = Array.isArray(country.capital)
				? country.capital[0]
				: country.capital;

			const extra = SUPPLEMENT[country.name.common] ?? {};

			let population = lookup(popIndex, country) ?? extra.population;
			if (population === undefined) {
				missing.population.push(country.name.common);
				population = 0;
			}

			let continent = lookup(continentIndex, country) ?? extra.continent;
			if (continent === undefined) {
				continent = REGION_TO_CONTINENT[country.region];
				missing.continent.push(country.name.common);
			}

			return {
				name: country.name.common,
				esName: country.translations?.spa?.common || country.name.common,
				code: country.cca3,
				flag: cca2 ? `https://flagcdn.com/${cca2}.svg` : "",
				altImg: `Flag of ${country.name.common}`,
				population,
				continents: continent ? [continent] : [],
				languages: country.languages ?? {},
				capital: capital ?? "",
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));

	writeFileSync(OUT, `${JSON.stringify(data, null, "\t")}\n`);

	console.log(`Wrote ${data.length} countries to ${OUT}`);
	if (missing.population.length)
		console.log(`No population for: ${missing.population.join(", ")}`);
	if (missing.continent.length)
		console.log(
			`Continent fell back to region for: ${missing.continent.join(", ")}`,
		);
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
