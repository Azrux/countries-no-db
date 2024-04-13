import type { enTranslations } from "@utils/translations/en";
import type { esTranslations } from "@utils/translations/es";

export type LanguageContextType = {
	language: string;
	changeLanguage: (language: "en" | "es") => void;
	translate: (key: string, defaultValue: string) => string;
};

export type TranslationsType = {
	es: keyof typeof esTranslations;
	en: keyof typeof enTranslations;
};
