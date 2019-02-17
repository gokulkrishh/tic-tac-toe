import React, { Component } from 'react'

import Footer from './Footer'
import Header from './Header'
import ThemeContext from './ThemeContext'
import TicTacToe from './TicTacToe'

import './App.css'

class App extends Component {
	getRandomColor() {
		return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
			Math.random() * 256
		)})`
	}

	render() {
		const randomColor = this.getRandomColor()
		const styles = { backgroundColor: randomColor }
		return (
			<ThemeContext.Provider value={{ backgroundColor: randomColor }}>
				<div style={styles} className="App">
					<Header />
					<TicTacToe />
					<Footer />
				</div>
			</ThemeContext.Provider>
		)
	}
}

export default App
