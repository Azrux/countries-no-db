import LanguageContext from "@context/languages/context";
import { useContext } from "react";

export const useLanguage = () => useContext(LanguageContext);
