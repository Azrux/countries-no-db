import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import type { FC } from "react";

const ThemeChanger: FC = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Switch
			size="md"
			color="default"
			isSelected={theme === "dark"}
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
		/>
	);
};

export default ThemeChanger;
