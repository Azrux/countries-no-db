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

const Navbar: FC = () => {
	return (
		<NextNavbar>
			<NavbarContent justify="start">
				<NavbarBrand>
					<Image src={CountriesLogo} width={75} />
				</NavbarBrand>
			</NavbarContent>

			{/* Search & Filters */}
			<NavbarContent className="hidden sm:flex !justify-center gap-3">
				{/* TODO: Agregar buscador y filtros */}
				<NavbarItem>
					<ThemeChanger />
				</NavbarItem>
			</NavbarContent>
		</NextNavbar>
	);
};

export default Navbar;
