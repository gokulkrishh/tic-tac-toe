import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import App from './App'
import ThemeContext from './ThemeContext'

import './index.css'

ReactDOM.render(
	<ThemeContext.Provider value="#673ab7">
		<App />
	</ThemeContext.Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
