import type { FC } from "react";
import type { LayoutProps } from "./types";
import NavBar from "./components/navbar";

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
	return (
		<div {...props}>
			<NavBar />
			<div className="pb-40 sm:pb-16 px-4">{children}</div>
		</div>
	);
};

export default Layout;
