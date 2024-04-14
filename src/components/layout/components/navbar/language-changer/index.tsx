import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@nextui-org/react";
import type { FC } from "react";

const LanguageChanger: FC = () => {
	const { language, changeLanguage } = useLanguage();

	return (
		<Switch
			size="md"
			color="default"
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<span className={className}>
						<Icon icon="circle-flags:us" />
					</span>
				) : (
					<span className={className}>
						<Icon icon="circle-flags:es" />
					</span>
				)
			}
			onChange={() => changeLanguage(language === "es" ? "en" : "es")}
			isSelected={language === "en"}
		/>
	);
};

export default LanguageChanger;
