import React, { useContext, useEffect, useState } from 'react'
import { LevelContext } from '../contexts/contexts'
import Editor from './Editor'

const Level = () => {
	const [keyCount, setKeyCount] = useState(0)
	const { level } = useContext(LevelContext)
	const [code, setCode] = useState(level.start_code)
	const [codeIsWrong, setCodeIsWrong] = useState<boolean | null>(null)

	const increaseKeyCount = () => setKeyCount(prevCount => prevCount + 1)

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
		<div className="level flex flex-column align-center jusitfy-center">
			<div className="editors">
				<div>
					<h1>Editor</h1>
					<Editor writeable={true} code={code} setCode={setCode} />
				</div>
				<div>
					<h1>Result</h1>
					<Editor writeable={false} code={level.end_code} setCode={setCode} />
				</div>
			</div>
			<h2> {level.creator} </h2>
			<h2> Key count: {keyCount} </h2>
			<button className="check" onClick={check}>Check</button>
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
		</div>
	)
}

export default Level
