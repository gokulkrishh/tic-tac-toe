import React from 'react'

import './Modal.css'

const Modal = ({ won, player, show, restartGameCallback }) => {
	if (!show) return null
	return (
		<>
			<div className="Modal">
				<h2>{won.by === player ? `You won 😬` : `You Lost 🤯`}</h2>
				<button onClick={restartGameCallback}>Play Again</button>
			</div>
			<div className="Modal__overlay" />
		</>
	)
}

export default Modal
