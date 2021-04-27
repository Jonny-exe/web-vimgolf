import React, { useContext, useState } from 'react'
import { LevelContext } from '../contexts/contexts'
import Editor from './Editor'
import Instructions from './Instructions'
import LeaderBoard from './LeaderBoard'

const Level = () => {
	const { level, setLevel } = useContext(LevelContext)
	const [code, setCode] = useState(level.startcode)

	const goBack = () => {
		setLevel({
			id: -1,
			startcode: "",
			endcode: "",
			creator: "",
			name: ""
		})
	}

	return (
		<div className="level flex flex-column align-center jusitfy-center full-width full-height">
			<div className="editors flex">
				<div className="margin editor-container">
					<Editor writeable={true} code={code} setCode={setCode} />
				</div>
				<div className="full-width margin">
					<Instructions level={level} code={code} />
					<LeaderBoard level={level} />
					<button onClick={goBack} className="margin-vertical"> Back </button>
				</div>
			</div>
		</div>
	)
}

export default Level
