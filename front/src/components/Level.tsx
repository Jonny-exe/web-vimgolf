import React, { useContext, useEffect, useState } from 'react'
import { LevelContext } from '../contexts/contexts'
import Editor from './Editor'
import Instructions from './Instructions'

const Level = () => {
	const { level } = useContext(LevelContext)
	const [code, setCode] = useState(level.start_code)

	return (
		<div className="level flex flex-column align-center jusitfy-center full-width full-height">
			<div className="editors flex">
				<div className="margin editor-container">
					<Editor writeable={true} code={code} setCode={setCode} />
				</div>
				<div className="full-width margin">
					<Instructions level={level} code={code} />
				</div>
			</div>
		</div>
	)
}

export default Level
