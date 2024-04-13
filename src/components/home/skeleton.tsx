import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Skeleton,
} from "@nextui-org/react";

const HomeSkeleton = () => {
	const cardNumber = 12;

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{[...Array(cardNumber)].map((_, index) => (
				<Card className="py-4 max-w-[250px] max-h-[300px]" key={`${index + 1}`}>
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<Skeleton className="w-40 h-4 mb-2" />
						<Skeleton className="w-20 h-3" />
					</CardHeader>
					<CardBody className="my-2 pb-0">
						<Skeleton className="w-[225px] h-[141px]" />
					</CardBody>
					<CardFooter className="flex justify-end mt-2">
						<Skeleton className="w-[100px] h-[40px]" />
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default HomeSkeleton;
