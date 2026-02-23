import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "./Pagination.css";

function Pagination({ page, setPage, maxPage }) {

	const getPages = () => {
		let pages = [];

		let start = Math.max(page - 1, 1);
		let end = Math.min(start + 2, maxPage);

		if (end - start < 2) {
			start = Math.max(end - 2, 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className="pagination">
			<FaChevronLeft
				className="button arrow"
				onClick={() => setPage(prev => Math.max(prev - 1, 1))}
			/>

			{getPages().map(num => (
				<p
					key={num}
					className={`${num === page ? "active" : "not__active"} button`}
					onClick={() => setPage(num)}
				>
					{num}
				</p>
			))}

			<FaChevronRight
				className="button arrow"
				onClick={() => setPage(prev => Math.min(prev + 1, maxPage))}
			/>
		</div>
	)
}

export default Pagination;
