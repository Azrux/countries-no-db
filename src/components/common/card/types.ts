import type { CommonTypes } from "src/types/common";

export type CardType = Omit<CommonTypes, "chidlren"> & {
	name: string;
	capital: string;
	image: string;
	onButtonClick: () => void;
	alt: string;
};
