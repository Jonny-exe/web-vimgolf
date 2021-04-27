import React, { useEffect, useState, useContext } from 'react'
import DiffViewer from 'react-diff-viewer'
import API_PATH from '../env'
import axios from 'axios'
import { Level } from '../types'
import { UsernameContext } from '../contexts/contexts'
interface Props {
	level: Level;
	setLevel: (newLevel: Level) => void;
	code: string;
	setCode: (newCode: string) => void;
}

const Instructions: React.FC<Props> = ({ level, setLevel, code, setCode }) => {
	const { username } = useContext(UsernameContext)
	const [keyCount, setKeyCount] = useState(0)
	const increaseKeyCount = () => setKeyCount(prevCount => prevCount + 1)
	const [codeIsWrong, setCodeIsWrong] = useState<boolean | null>(null)
	const [errorSubmiting, setErrorSubmiting] = useState<boolean>(false)
	const [showDiff, setShowDiff] = useState(false)

	const reset = () => {
		setCode(level.startcode)
		setKeyCount(0)
	}

	const goBack = () => {
		setLevel({
			id: -1,
			startcode: "",
			endcode: "",
			creator: "",
			name: ""
		})
	}
	const submitScore = async () => {
		try {
			await axios.post(`${API_PATH}/graphql`, {
				query:
					`{ insertscore(username: \"${username}\",score: ${keyCount}, challengeid: ${level.id}) {
						id
					} }`
			})
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
		if (code === level.endcode) {
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
				{level.startcode}
			</pre>
			<br />
			into this:
			<pre className="end-code padding">
				{level.endcode}
			</pre>

			<button onClick={() => setShowDiff(true)}>View diff</button>
			<div className={`modal ${showDiff ? "active" : "hidden"}`}>
				<DiffViewer newValue={level.startcode} oldValue={level.endcode} />
			</div>
			<div onClick={() => setShowDiff(false)} className={`overlay ${showDiff ? "active" : "hidden"}`}></div>

			<p>
				Key-strokes: {keyCount}
			</p>
			<br/>
			<button className={`check ${codeIsWrong || codeIsWrong === null ? "active" : "hidden"}`} onClick={check}>Check</button>
			<button className={`check ${!codeIsWrong && codeIsWrong !== null ? "active" : "hidden"}`} onClick={submitScore}>Submit score</button>

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

			<button onClick={reset} className="margin-vertical"> Reset </button>
			<button onClick={goBack} style={{marginBottom: "1%"}}> Back </button>
		</>
	)
}

export default Instructions
