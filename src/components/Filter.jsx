import { useEffect, useRef } from "react";
import { FaSearch, } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./Filter.css";

function Filter({ filterMenu, filters, setFilters, setFilterMenu }) {
	const style = {
		position: "fixed",
		top: Math.min(filterMenu.y, window.innerHeight - 150),
		left: Math.min(filterMenu.x, window.innerWidth - 250)
	};

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div
			className="filter-popover"
			style={style}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="filter-content">
				<div className="input-wrapper">
					<span className="search-icon"><FaSearch/></span>
					<input
						ref={inputRef}
						type="text"
						placeholder="Поиск"
						value={filters?.[filterMenu.field] || ""}
						onChange={(e) =>
							setFilters(prev => ({
								...prev,
								[filterMenu.field]: e.target.value
							}))
						}
					/>
				</div>
				<button className="close-btn" onClick={() => setFilterMenu(null)}>
					<IoClose />
				</button>
			</div>
		</div>
	);
}

export default Filter;