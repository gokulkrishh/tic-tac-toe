import React, { Component } from 'react'

import './TicTacToe.css'

class TicTacToe extends Component {
	state = {
		board: [],
		computer: 'o',
		user: 'x',
		lastInsertedIndex: -1,
		filledCells: [],
		winCombination: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
	}

	componentDidMount() {
		this.startGame()
	}

	startGame = () => {
		this.setState({ board: [] })
	}

	onTurnClick = (id, who) => {
		const { board, filledCells } = this.state
		if (!board[id]) {
			board[id] = who
			filledCells.push(id)
		}
		this.setState({ board, lastInsertedIndex: id, filledCells })
	}

	onComputerTurnClick = () => {
		const { board, computer, filledCells } = this.state
		let autoCalculatedTurn = Math.floor(Math.random() * 10)
		if (!board[autoCalculatedTurn]) {
			board[autoCalculatedTurn] = computer
			filledCells.push(autoCalculatedTurn)
		}

		this.setState({ board, lastInsertedIndex: autoCalculatedTurn, filledCells })
	}

	componentDidUpdate() {}

	render() {
		const { board, user } = this.state
		return (
			<div className="TicTacToe">
				<div className="lines">
					{Array.from(Array(9).keys()).map(cell => {
						return (
							<div
								key={cell}
								id={cell}
								onClick={event => {
									this.onTurnClick(event.target.id, user)
									this.onComputerTurnClick()
								}}
								style={{ pointerEvents: board[cell] ? 'none' : 'initial' }}
							>
								{board[cell]}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default TicTacToe
