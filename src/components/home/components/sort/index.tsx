import { useLanguage } from "@hooks/useLanguage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Select, SelectItem } from "@nextui-org/react";
import type { FC } from "react";
import type { SortProps } from "./types";

const Sort: FC<SortProps> = ({ sortCountries }) => {
	const { translate } = useLanguage();

	return (
		<div className="flex items-center w-full sm:w-1/3">
			<Select
				id="sort"
				className="flex items-center w-full"
				label={translate("filters.sortLabel", "Sort by")}
				value="name"
				color="danger"
				size="sm"
				onChange={(e) => sortCountries(e.target.value)}
			>
				<SelectItem
					textValue={`${translate("filters.name", "Name")} AZ`}
					key="nameAZ"
					value="nameAZ"
					hideSelectedIcon
				>
					<div className="flex items-center justify-between">
						{translate("filters.name", "Name")} A-Z
						<div className="flex flex-col">
							<Icon icon="mingcute:az-sort-descending-letters-line" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue={`${translate("filters.name", "Name")} ZA`}
					key="nameZA"
					value="nameZA"
					hideSelectedIcon
				>
					<div className="flex items-center justify-between">
						{translate("filters.name", "Name")} Z-A
						<div className="flex flex-col">
							<Icon icon="mingcute:za-sort-descending-letters-line" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue="capital A-Z"
					key="capitalAZ"
					value="capitalAZ"
					hideSelectedIcon
				>
					<div className="flex items-center justify-between">
						Capital A-Z
						<div className="flex flex-col">
							<Icon icon="mingcute:az-sort-descending-letters-line" />
						</div>
					</div>
				</SelectItem>
				<SelectItem
					textValue="capital Z-A"
					key="capitalZA"
					value="capitalZA"
					hideSelectedIcon
				>
					<div className="flex items-center justify-between">
						Capital Z-A
						<div className="flex flex-col">
							<Icon icon="mingcute:za-sort-descending-letters-line" />
						</div>
					</div>
				</SelectItem>
			</Select>
		</div>
	);
};

export default Sort;
