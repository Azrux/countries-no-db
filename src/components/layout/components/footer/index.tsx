import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "@nextui-org/react";
import type { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
	return (
		<div className="flex flex-col sm:flex-row justify-around items-center bg-default-50 fixed bottom-0 w-full z-40 pt-2">
			<div className="flex items-center space-x-4 pb-2 sm:pb-0">
				<Tooltip content="Portfolio">
					<Link to="https://portfolio-kype.onrender.com/" target="_blank">
						<Icon icon="ph:code-bold" />
					</Link>
				</Tooltip>
				<Tooltip content="Linkedin">
					<Link
						to="https://www.linkedin.com/in/laura-marcenaro/"
						target="_blank"
					>
						<Icon icon="mdi:linkedin" />
					</Link>
				</Tooltip>
				<Tooltip content="Github">
					<Link to="https://github.com/Azrux" target="_blank">
						<Icon icon="mdi:github" />
					</Link>
				</Tooltip>
			</div>
		</div>
	);
};

export default Footer;
