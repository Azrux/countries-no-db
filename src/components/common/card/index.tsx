import {
	Card as NextUICard,
	CardHeader,
	CardBody,
	Image,
	CardFooter,
	Button,
} from "@nextui-org/react";
import type { FC } from "react";
import type { CardType } from "./types";

const Card: FC<CardType> = ({ name, capital, image, onButtonClick }) => {
	return (
		<NextUICard className="py-4 max-w-[250px] max-h-[300px] transition-transform transform hover:scale-110">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<h4 className="font-bold text-large">{name}</h4>
				<p className="text-tiny">{capital}</p>
			</CardHeader>
			<CardBody className="overflow-visible my-2 pb-0">
				<Image alt={name} className="object-cover rounded-xl" src={image} />
			</CardBody>
			<CardFooter className="flex justify-end mt-2">
				<Button onClick={onButtonClick} color="danger">
					More details
				</Button>
			</CardFooter>
		</NextUICard>
	);
};

export default Card;
