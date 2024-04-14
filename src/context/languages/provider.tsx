import { type FC, useState } from "react";
import type { CommonTypes } from "src/types/common";
import LanguageContext from "./context";
import type { TranslationsType } from "@context/types";
import { esTranslations } from "@utils/translations/es";
import { enTranslations } from "@utils/translations/en";

export const LanguageProvider: FC<CommonTypes> = ({ children }) => {
	const locale = navigator.language;
	const defaultLocale = locale.includes("es") ? "es" : "en";

	const [language, setLanguage] = useState<"en" | "es">(defaultLocale);

	const translations: TranslationsType = {
		es: esTranslations as unknown as TranslationsType["es"],
		en: enTranslations as unknown as TranslationsType["en"],
	};

	const changeLanguage = (newLanguage: "en" | "es") => {
		setLanguage(newLanguage);
	};

	const translate = (key: string, defaultValue: string) => {
		const keys = key.split(".");
		const translation = translations[language];

		if (!translation) return defaultValue;

		//@ts-ignore
		return keys.reduce((acc, k) => acc?.[k], translation) || defaultValue;
	};

	return (
		<LanguageContext.Provider value={{ language, changeLanguage, translate }}>
			{children}
		</LanguageContext.Provider>
	);
};
