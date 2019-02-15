import React, { Component } from 'react'

import logo from './logo.svg'
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
		const styles = { backgroundColor: this.getRandomColor() }
		return (
			<div style={styles} className="App">
				<header className="App-header">
					<a href="/" className="App-link">
						<img src={logo} className="App-logo" alt="logo" />
					</a>
				</header>
				<TicTacToe />
				<footer>
					<p>
						Built with{' '}
						<span role="img" aria-label="love">
							😍
						</span>{' '}
						by{' '}
						<a className="App-link" href="https://github.com/gokulkrishh" target="_blank" rel="noopener noreferrer">
							Gokul
						</a>
					</p>
				</footer>
			</div>
		)
	}
}

App.contextType = ThemeContext

export default App
