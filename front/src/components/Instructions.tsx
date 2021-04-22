import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Level } from '../types'
import { UsernameContext } from '../contexts/contexts'
interface Props {
	level: Level;
	code: string;
}

const Instructions: React.FC<Props> = ({ level, code }) => {
	const { username } = useContext(UsernameContext)
	const [keyCount, setKeyCount] = useState(0)
	const increaseKeyCount = () => setKeyCount(prevCount => prevCount + 1)
	const [codeIsWrong, setCodeIsWrong] = useState<boolean | null>(null)
	const [errorSubmiting, setErrorSubmiting] = useState<boolean>(false)

	const submitScore = async () => {
		try {
			await axios.post("http://localhost:8080/scores", { challenge_id: level.id, username, score: keyCount })
		} catch (err) {
			console.log(err)
			setErrorSubmiting(true)
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", increaseKeyCount)

		return () => {
			window.removeEventListener("keydown", increaseKeyCount)
		}
	}, [])

	const check = () => {
		let isCodeWrong
		if (code === level.end_code) {
			isCodeWrong = false
		} else {
			isCodeWrong = true
		}
		setCodeIsWrong(isCodeWrong)
	}

	return (
		<>
			<h1 className="instructions-header flex"> <span>Instructions:</span><span>Created by: {level.creator}</span> </h1>
			Transform this:
			<pre className="end-code padding">
				{level.start_code}
			</pre>
			<br />
			into this:
			<pre className="end-code padding">
				{level.end_code}
			</pre>

			<p>
				Key-strokes: {keyCount}
			</p>
			<button className={`check ${codeIsWrong || codeIsWrong === null ? "active" : "hidden"}`} onClick={check}>Check</button>
			<button className={`check ${!codeIsWrong && codeIsWrong !== null ? "active" : "hidden"}`} onClick={submitScore}>Submit score</button>

			<br />
			<div className={`note error ${errorSubmiting ? "active" : "hidden"}`}>
				An error has occurred trying to submit your score. Please try again later
			</div>
			{
				codeIsWrong === true ?
					<div className="note error">
						Something is wrong. Keep trying.
					</div>
					:
					codeIsWrong === null ?
						<>
						</>
						:
						<div className="note correct">
							Good job
						</div>
			}
		</>
	)
}

export default Instructions
