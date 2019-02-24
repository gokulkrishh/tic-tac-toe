import React, { useState, useContext } from 'react'

import GameStats from './GameStats'
import ThemeContext from './ThemeContext'

import './TicTacToe.css'
import Modal from './Modal'

const TicTacToe = (props, context) => {
	const computer = 'o'
	const player = 'x'
	const winCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

	const [state, setState] = useState({
		board: { ...Array.from(Array(9).values()) },
		won: { index: -1, by: '' },
		stats: { player: 0, computer: 0 }
	})

	const { board, stats, won } = state

	const { backgroundColor } = useContext(ThemeContext)

	const restartGame = () => {
		setState({ ...state, board: { ...Array.from(Array(9).values()) }, won: { index: -1, by: '' } })
	}

	const onTurnClick = (id, who) => {
		let { board } = state
		if (!board[id]) {
			board[id] = who
		}
		setState({ ...state, board })

		if (!checkIfThereIsAWinner(who)) {
			onComputerTurn()
		}
	}

	const onComputerTurn = () => {
		const { board } = state
		const id = Object.keys(board).filter(key => !board[key])[0]
		if (!board[id]) {
			board[id] = computer
		}

		setState({ ...state, board })
		checkIfThereIsAWinner(computer)
	}

	const checkIfThereIsAWinner = player => {
		const playedByPlayer = Object.keys(board).reduce((acc, value, index) => {
			return board[value] === player ? acc.concat(index) : acc
		}, [])

		for (let [index, entries] of winCombination.entries()) {
			if (entries.every(entry => playedByPlayer.indexOf(entry) > -1)) {
				const won = { index, by: player }
				if (player === 'x') {
					stats['player'] += 1
				} else {
					stats['computer'] += 1
				}
				setState({ ...state, won, stats })
				return true
			}
		}

		return false
	}

	return (
		<>
			<div className="TicTacToe">
				<div className="lines">
					{Array.from(Array(9).keys()).map((cell, index) => {
						const hasWon = winCombination[won.index] && winCombination[won.index].indexOf(cell) > -1
						return (
							<div
								key={cell}
								onClick={event => {
									onTurnClick(cell, player)
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
			<Modal won={won} player={player} show={won.index > -1} restartGameCallback={restartGame} />
		</>
	)
}

export default TicTacToe
