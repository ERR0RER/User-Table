import ModalWindow from "./ModalWindow"
import { useState } from "react"
import "./Row.css"

function Row({ user }) {
	const [ModalIsOpen, setModalIsOpen] = useState(false);

	return (
		<>
			<tr onClick={() => setModalIsOpen(true)}>
				<td className="user-id">
					{user.id}
				</td>

				<td>
					{` ${user.firstName} ${user.lastName} ${user.maidenName || ""}`}
				</td>

				<td>
					{user.age}
				</td>

				<td>
					{user.gender === "female"
						? "Ж" : "М"}
				</td>

				<td>
					{user.phone}
				</td>

				<td className="email">
					{user.email}
				</td>

				<td className="country">
					{user.address.country === "United States"
						? "USA" : user.address.country}
				</td>

				<td className="city">
					{user.address.city}, {user.address.address}
				</td>
			</tr>
			{ModalIsOpen && (<ModalWindow user={user} onClose={() => setModalIsOpen(false)} />)}
		</>
	)
}

export default Row