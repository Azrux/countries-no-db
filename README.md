# Countries App

This web application allows users to explore countries from around the world, displaying their information in an intuitive interface.

[Click to see the live version](https://countries-no-db.onrender.com/)

## Features

- **Country Data**: Ships with a self-contained snapshot in `src/data/countries.json`, so the app needs no external API at runtime. Regenerate it with `npm run build:data` — the script in `scripts/build-countries.mjs` pulls from [mledoze/countries](https://github.com/mledoze/countries), [samayo/country-json](https://github.com/samayo/country-json) and [flagcdn.com](https://flagcdn.com/). (It originally used the Rest Countries API, which shut down its free v3.1 endpoints.)
- **Pagination**: Implements pagination for easier navigation through the list of countries.
- **Country Details**: Provides detailed information about each country upon selection.
- **Sorting and Filtering**: Enables sorting and filtering of countries by continent.
- **Dark and Light Modes**: Supports both dark and light themes for user preference.
- **Localization**: Offers localization for English and Spanish languages.

## Technologies Used

- **Vite**: Fast and minimalist web development build tool.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for improved developer experience.
- **NextUI**: UI component library for React.
- **Tailwind CSS**: Utility-first CSS framework for building custom designs quickly.

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Open your browser and navigate to `http://localhost:5173`.

## Usage

- Browse through the list of countries using the pagination controls.
- Click on a country to view detailed information.
- Use the sorting and filtering options to organize countries by name or continent.
- Toggle between dark and light modes using the theme switcher.
- Change the language between English and Spanish for localization.
