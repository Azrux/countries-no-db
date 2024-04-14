import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Select, SelectItem } from "@nextui-org/react";
import type { FC } from "react";
import type { FilterProps } from "./types";

const Filter: FC<FilterProps> = ({ filterByContinent }) => {
	const { translate } = useLanguage();

	return (
		<div className="flex items-center w-full sm:w-1/3">
			<Select
				id="filters"
				className="flex items-center w-full"
				label={translate("filters.filterLabel", "Filter by...")}
				selectionMode="multiple"
				color="danger"
				size="sm"
				onChange={(e) => filterByContinent(e.target.value)}
			>
				<SelectItem
					textValue={translate("filters.africa", "Africa")}
					key="Africa"
					value="Africa"
				>
					<div className="flex items-center justify-between">
						{translate("filters.africa", "Africa")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={translate("filters.america", "America")}
					key="America"
					value="America"
				>
					<div className="flex items-center justify-between">
						{translate("filters.america", "America")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={translate("filters.asia", "Asia")}
					key="Asia"
					value="Asia"
				>
					<div className="flex items-center justify-between">
						{translate("filters.asia", "Asia")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={translate("filters.europe", "Europa")}
					key="Europe"
					value="Europe"
				>
					<div className="flex items-center justify-between">
						{translate("filters.europe", "Europa")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={translate("filters.oceania", "Oceania")}
					key="Oceania"
					value="Oceania"
				>
					<div className="flex items-center justify-between">
						{translate("filters.oceania", "Oceania")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={translate("filters.antarctica", "Antarctica")}
					key="Antarctica"
					value="Antarctica"
				>
					<div className="flex items-center justify-between">
						{translate("filters.antarctica", "Antarctica")}
						<div className="flex flex-col">
							<Icon icon="mdi:earth" />
						</div>
					</div>
				</SelectItem>
			</Select>
		</div>
	);
};

export default Filter;
