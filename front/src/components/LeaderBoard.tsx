import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_PATH from '../env'
import { Level, Score } from '../types'

interface Props {
	level: Level;
}

const LeaderBoard: React.FC<Props> = ({ level }) => {
	const [showLeaderBoard, setShowLeaderBoard] = useState(false)
	const [scores, setScores] = useState<Score[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: { data } } = await axios.post(`${API_PATH}/graphql`, {
					query: `{
						getscoresbyid(challengeid: ${level.id}) {
							username,
							score,
							id
						}
					}`
				})
				setScores(data['getscoresbyid'])
			} catch (err) {
				console.log(err)
			}
		}

		fetchData()
	}, [showLeaderBoard, level.id])

	return (
		<>
			<button onClick={() => setShowLeaderBoard(!showLeaderBoard)}>
				{showLeaderBoard ? "Hide Leaderboard" : "Show Leaderboard"}
			</button>
			<div className={`invert text-align-center full-width ${showLeaderBoard ? "active" : "hidden"}`}>
				<table className="full-width margin">
					<thead>
						<tr>
							<th>Name</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{scores.map((item, index) => (
							<tr>
								<td>{item.username}</td>
								<td>{item.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default LeaderBoard
