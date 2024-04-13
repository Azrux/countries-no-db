import axios from "axios";

export const getCountries = async () => {
	axios
		.get("https://restcountries.com/v3.1/all")
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error("Error al hacer la solicitud:", error);
		});
};
