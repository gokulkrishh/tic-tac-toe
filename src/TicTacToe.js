import React, { Component } from 'react'

import ThemeContext from './ThemeContext'

import './TicTacToe.css'

class TicTacToe extends Component {
	state = {
		board: Array.from(Array(9).keys()),
		computer: 'o',
		player: 'x',
		winCombination: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]],
		won: { index: -1 }
	}

	componentDidMount() {
		this.startGame()
	}

	startGame = () => {
		this.setState({ board: [] })
	}

	onTurnClick = (id, who) => {
		let { board } = this.state
		if (!board[id]) {
			board[id] = who
		}
		this.setState({ board }, () => {
			this.checkWinner(who)
		})
	}

	checkWinner(player) {
		const { board, winCombination } = this.state

		const playedByPlayer = board.reduce((acc, value, index) => {
			return value === player ? acc.concat(index) : acc
		}, [])

		for (let [index, entries] of winCombination.entries()) {
			if (entries.every(entry => playedByPlayer.indexOf(entry) > -1)) {
				const won = { index, player }
				this.setState({ won })
			}
		}
	}

	render() {
		const { board, player, won, winCombination } = this.state
		const { backgroundColor } = this.context
		return (
			<div className="TicTacToe">
				<div className="lines">
					{Array.from(Array(9).keys()).map(cell => {
						const hasWon = winCombination[won.index] && winCombination[won.index].indexOf(cell) > -1
						return (
							<div
								key={cell}
								onClick={event => {
									this.onTurnClick(cell, player)
								}}
								style={{
									pointerEvents: board[cell] || won.index !== -1 ? 'none' : 'initial',
									backgroundColor: hasWon ? `${backgroundColor}` : ''
								}}
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

TicTacToe.contextType = ThemeContext

export default TicTacToe
