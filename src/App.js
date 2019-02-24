import React from 'react'

import Footer from './Footer'
import Header from './Header'
import ThemeContext from './ThemeContext'
import TicTacToe from './TicTacToe'

import './App.css'

const App = () => {
	const getRandomColor = () => {
		return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)})`
	}

	const randomColor = getRandomColor()
	const styles = { backgroundColor: randomColor }

	return (
		<ThemeContext.Provider value={styles}>
			<div style={styles} className="App">
				<Header />
				<TicTacToe />
				<Footer />
			</div>
		</ThemeContext.Provider>
	)
}

export default App
