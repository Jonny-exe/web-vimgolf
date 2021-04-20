import React, { useEffect, useState } from 'react'
import { Level } from '../types'
interface Props {
	level: Level
	code: string;
}

const Instructions: React.FC<Props> = ({ level, code }) => {
	const [keyCount, setKeyCount] = useState(0)
	const increaseKeyCount = () => setKeyCount(prevCount => prevCount + 1)
	const [codeIsWrong, setCodeIsWrong] = useState<boolean | null>(null)

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
			<button className="check" onClick={check}>Submit</button>

			<br />
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
