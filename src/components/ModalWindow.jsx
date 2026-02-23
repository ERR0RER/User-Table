import "./ModalWindow.css"

function ModalWindow({ user, onClose}) {
	if (!user) {
		return null;
	}

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>

				<div className="modal-header">
					<div className="modal__photo-wrapper">
						<img src={user.image} alt="User" className="modal__img" />
					</div>
					<h2 className="modal__name">
						{user.firstName} {user.lastName}
					</h2>
					{user.maidenName && <p className="modal__maiden">{user.maidenName}</p>}
				</div>

				<div className="modal-info-grid">
					<div className="info-item">
						<span className="info-label">Возраст</span>
						<span className="info-value">{user.age}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Страна</span>
						<span className="info-value">{user.address.country}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Город</span>
						<span className="info-value">{user.address.city}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Рост / Вес</span>
						<span className="info-value">{user.height} см / {user.weight} кг</span>
					</div>
				</div>

				<div className="modal-footer">
					<div className="contact-field">
						<small>Телефон</small>
						<p>{user.phone}</p>
					</div>
					<div className="contact-field">
						<small>Email</small>
						<p className="email-text">{user.email}</p>
					</div>
				</div>

			</div>
		</div>
	)
}

export default ModalWindow