import React, { useContext, useState } from 'react'
import { LevelContext } from '../contexts/contexts'
import Editor from './Editor'
import Instructions from './Instructions'
import LeaderBoard from './LeaderBoard'

const Level = () => {
	const { level, setLevel } = useContext(LevelContext)
	const [code, setCode] = useState(level.startcode)
	const [keyCount, setKeyCount] = useState(0)


	const reset = () => {
		setCode(level.startcode)
		setKeyCount(0)
	}

	return (
		<div className="level flex flex-column align-center jusitfy-center full-width full-height">
			<div className="editors flex">
				<div className="margin editor-container">
					<Editor reset={reset} writeable={true} code={code} setCode={setCode} />
				</div>
				<div className="full-width margin">
					<Instructions level={level} setLevel={setLevel} code={code} setCode={setCode} keyCount={keyCount} setKeyCount={setKeyCount} reset={reset}/>
					<LeaderBoard level={level} />
				</div>
			</div>
		</div>
	)
}

export default Level
