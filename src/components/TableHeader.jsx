import "./TableHeader.css";
import RenderIcon from "./RenderIcon";


function TableHead({ sort, handleSort, openFilterMenu }) {
	return (
		<thead className="table-header">
			<tr>
				<th>№</th>
				<th className="full-name"
					onClick={() => handleSort("firstName")}
					onContextMenu={(e) => openFilterMenu("firstName", e)}>
					ФИО
					<RenderIcon
						sort={sort}
						fieldToSort="firstName"
					/>
				</th>
				<th className="age"
					onClick={() => handleSort("age")}
					onContextMenu={(e) => openFilterMenu("age", e)}>
					Возраст
					<RenderIcon
						sort={sort}
						fieldToSort="age"
					/>
				</th>
				<th className="gender"
					onClick={() => handleSort("gender")}
					onContextMenu={(e) => openFilterMenu("gender", e)}>
					Пол
					<RenderIcon
						sort={sort}
						fieldToSort="gender"
					/>
				</th>
				<th className="phone-number"
					onClick={() => handleSort("phone")}
					onContextMenu={(e) => openFilterMenu("phone", e)}>
					Номер телефона
					<RenderIcon
						sort={sort}
						fieldToSort="phone"
					/>
				</th>
				<th className="email">Email</th>
				<th className="country">Страна</th>
				<th className="city">Город</th>
			</tr>
		</thead>
	)
}

export default TableHead;