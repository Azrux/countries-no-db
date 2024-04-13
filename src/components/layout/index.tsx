import type { FC } from "react";
import type { LayoutProps } from "./types";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

const Layout: FC<LayoutProps> = ({ children, ...props }) => {
	return (
		<div {...props}>
			<NavBar />
			<div className="sm:pb-16 p-10">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
