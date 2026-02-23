import { HiMiniBars3, HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";

function RenderIcon({ sort, fieldToSort }) {
	let Icon = HiMiniBars3;

	if (sort.field === fieldToSort) {
		if (sort.order === "asc") Icon = HiMiniBarsArrowDown;
		if (sort.order === "desc") Icon = HiMiniBarsArrowUp;
	}

	return (
		<span className="icon">
			<Icon/>
		</span>
	)
}

export default RenderIcon