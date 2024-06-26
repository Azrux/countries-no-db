import { createContext } from "react";
import type { LanguageContextType } from "../types";

const LanguageContext = createContext<LanguageContextType>({
	language: "es",
	changeLanguage: () => {},
	translate: () => "",
});

export default LanguageContext;
