import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, type FC } from "react";

const ThemeChanger: FC = () => {
	const { theme, setTheme } = useTheme();

	const prefersDarkMode = window.matchMedia?.(
		"(prefers-color-scheme: dark)",
	).matches;

	useEffect(() => {
		if (prefersDarkMode) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, [prefersDarkMode, setTheme]);

	return (
		<Switch
			size="md"
			color="default"
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<span className={className}>
						<Icon icon="mdi:moon-waning-crescent" />
					</span>
				) : (
					<span className={className}>
						<Icon icon="material-symbols:sunny" />
					</span>
				)
			}
			onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
			isSelected={
				prefersDarkMode === true ? theme === "dark" : theme === "light"
			}
		/>
	);
};

export default ThemeChanger;
