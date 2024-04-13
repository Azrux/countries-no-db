import { Icon } from "@iconify/react/dist/iconify.js";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			<Switch
				className="animate-none"
				size="md"
				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<span className={className}>
							<Icon icon="material-symbols:sunny" />
						</span>
					) : (
						<span className={className}>
							<Icon icon="mdi:moon-waning-crescent" />
						</span>
					)
				}
				onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
			/>
		</div>
	);
};

export default ThemeChanger;
