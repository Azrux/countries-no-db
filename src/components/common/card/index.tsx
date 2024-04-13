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

const Card: FC<CardType> = ({ name, capital, image, alt, onButtonClick }) => {
	return (
		<NextUICard className="py-4 w-[300px] h-[350px] transition-transform transform hover:scale-110 mb-2 hover:z-50 hover:shadow-lg">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<h4 className="font-bold text-large">{name}</h4>
				<p className="text-tiny">{capital}</p>
			</CardHeader>
			<CardBody className="flex items-center justify-center my-2 pb-0 overflow-hidden">
				<Image alt={alt} src={image} width={250} height={250} />
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
