import {
	Image,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Navbar as NextNavbar,
} from "@nextui-org/react";
import CountriesLogo from "@assets/country-flags.png";
import type { FC } from "react";
import ThemeChanger from "./theme-changer";
import LanguageChanger from "./language-changer";

const Navbar: FC = () => {
	return (
		<NextNavbar
			isBlurred
			isBordered
			className="h-20 bg-gradient-to-b from-danger-200 to-danger-500 border-b-2 border-danger-600"
		>
			<NavbarContent justify="start">
				<NavbarBrand>
					<Image src={CountriesLogo} width={75} />
					<h1 className="font-title text-[40px]">Countries!</h1>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="flex flex-col gap-1">
					<ThemeChanger />
					<LanguageChanger />
				</NavbarItem>
			</NavbarContent>
		</NextNavbar>
	);
};

export default Navbar;
