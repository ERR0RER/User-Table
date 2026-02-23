import { useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Row from "./Row";
import "./Table.css";
import TableHeader from "./TableHeader";
import Filter from "./Filter";

function Table() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const [filterMenu, setFilterMenu] = useState(null);
	const [filters, setFilters] = useState({});

	const [sort, setSort] = useState({
		field: null,
		order: null // asc | desc | null
	});

	const LIMIT = 15;

	const sendRequest = async (requestBody) => {
		const response = await fetch(
			`https://dummyjson.com/users${requestBody || ""}`
		);

		if (!response.ok) {
			throw new Error("Ошибка при загрузке");
		}

		return response.json();
	};

	const fetchUsers = useCallback(async () => {
		try {
			setLoading(true);

			const data = await sendRequest("?limit=100");

			setUsers(data.users);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleSort = (field) => {
		setSort((prev) => {
			if (prev.field !== field) {
				return { field, order: "asc" };
			}

			if (prev.order === "asc") {
				return { field, order: "desc" };
			}

			return { field: null, order: null };
		});
	};

	const openFilterMenu = (field, event) => {
		event.preventDefault();

		setFilterMenu({
			field,
			x: event.clientX,
			y: event.clientY
		});
	};

	useEffect(() => {
		const close = () => setFilterMenu(null);
		window.addEventListener("click", close);
		return () => window.removeEventListener("click", close);
	}, []);

	const filteredUsers = users.filter(user => {
		return Object.entries(filters).every(([key, value]) => {
			if (!value) {
				return true;
			}

			let searchValue = value.toLowerCase().trim();
			let userValue = String(user[key]).toLowerCase();

			if (key === "gender") {
				const genderMap = {
					"м": "male",
					"m": "male",
					"ж": "female",
					"f": "female",
				};

				if (genderMap[searchValue]) {
					searchValue = genderMap[searchValue];
				}

				return userValue === searchValue;
			}

			return userValue.includes(searchValue);
		});
	});

	const sortedUsers = [...filteredUsers].sort((first, second) => {
		if (!sort.field || !sort.order) {
			return 0;
		}

		if (first[sort.field] < second[sort.field]) {
			return sort.order === "asc" ? -1 : 1;
		}

		if (first[sort.field] > second[sort.field]) {
			return sort.order === "asc" ? 1 : -1;
		}

		return 0;
	});

	const maxPage = Math.ceil(sortedUsers.length / LIMIT);

	const paginatedUsers = sortedUsers.slice(
		(page - 1) * LIMIT,
		page * LIMIT
	);

	useEffect(() => {
		setPage(1);
	}, [sort, filters]);

	if (loading) {
		return <div className="loading">Загрузка</div>;
	}

	if (error) {
		return <div className="error">Ошибка: {error}</div>;
	}

	return (
		<>
			<span className="support-text">*пкм по заголовку открывает поиск</span>
			<div className="main-container">
				<h1 className="table-title">Список пользователей</h1>
				<div className="table-wrapper">
					<table>
						<TableHeader
							sort={sort}
							handleSort={handleSort}
							openFilterMenu={openFilterMenu}
						/>
						<tbody>
							{paginatedUsers.map((user) => (
								<Row
									key={user.id}
									user={user}
								/>
							))}
						</tbody>
					</table>
				</div>
				<Pagination
					page={page}
					setPage={setPage}
					maxPage={maxPage}
				/>
			</div>

			{filterMenu && (
				<Filter
					filterMenu={filterMenu}
					setFilters={setFilters}
					setFilterMenu={setFilterMenu}
					filters={filters}
				/>
			)}
		</>
	)
}

export default Table
