import React from 'react'

import './GameStats.css'

const GameStats = ({ stats }) => (
	<div className="GameStats">
		<span>
			<b>You:</b> {stats.player}
		</span>
		<span>
			<b>Computer:</b> {stats.computer}
		</span>
	</div>
)

export default GameStats
