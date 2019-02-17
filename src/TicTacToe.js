import React, { Component } from 'react'

import GameStats from './GameStats'
import ThemeContext from './ThemeContext'

import './TicTacToe.css'
import Modal from './Modal'

class TicTacToe extends Component {
	computer = 'o'
	player = 'x'
	winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

	state = {
		board: { ...Array.from(Array(9).values()) },
		won: { index: -1, by: '' },
		stats: { player: 0, computer: 0 }
	}

	restartGame = () => {
		this.setState({ board: { ...Array.from(Array(9).values()) }, won: { index: -1, by: '' } })
	}

	onTurnClick = (id, who) => {
		let { board } = this.state
		if (!board[id]) {
			board[id] = who
		}
		this.setState({ board }, () => {
			if (!this.checkIfThereIsAWinner(who)) {
				this.onComputerTurn()
			}
		})
	}

	onComputerTurn() {
		const { board } = this.state
		const id = Object.keys(board).filter(key => !board[key])[0]
		if (!board[id]) {
			board[id] = this.computer
		}

		this.setState({ board }, () => {
			this.checkIfThereIsAWinner(this.computer)
		})
	}

	checkIfThereIsAWinner = player => {
		const { board, stats } = this.state

		const playedByPlayer = Object.keys(board).reduce((acc, value, index) => {
			return board[value] === player ? acc.concat(index) : acc
		}, [])

		for (let [index, entries] of this.winCombination.entries()) {
			if (entries.every(entry => playedByPlayer.indexOf(entry) > -1)) {
				const won = { index, by: player }
				if (player === this.player) {
					stats['player'] += 1
				} else {
					stats['computer'] += 1
				}
				this.setState({ won, stats })
				return true
			}
		}

		return false
	}

	render() {
		const { board, won, stats } = this.state
		const { backgroundColor } = this.context
		return (
			<>
				<div className="TicTacToe">
					<div className="lines">
						{Array.from(Array(9).keys()).map((cell, index) => {
							const hasWon = this.winCombination[won.index] && this.winCombination[won.index].indexOf(cell) > -1
							return (
								<div
									key={cell}
									onClick={event => {
										this.onTurnClick(cell, this.player)
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
					<GameStats stats={stats} />
				</div>
				<Modal won={won} player={this.player} show={won.index > -1} restartGameCallback={this.restartGame} />
			</>
		)
	}
}

TicTacToe.contextType = ThemeContext

export default TicTacToe
