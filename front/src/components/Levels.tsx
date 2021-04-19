import React, { useContext, useEffect, useState } from 'react'
import { Level } from '../types'
import axios from 'axios'
import { LevelContext } from '../contexts/contexts'


const Levels = () => {

	const { setLevel } = useContext(LevelContext)
	const [levels, setLevels] = useState<Level[]>([])

	const getLevels = async () => {
		try {
			const { data } = await axios.get('http://localhost:8080/levels')
			setLevels(data)
		} catch (err) {
			console.log(err)
			setLevels([])
		}
	}

	useEffect(() => {
		getLevels()
	}, [])

	return (
		<div className="levels flex justify-center align-center">
			{
				levels.map((item, index) => (
					<div key={index} onClick={() => setLevel(levels[index])}>
					{/* // <div key={index} onClick={() => console.log("HELLO")}> */}
						{item.creator}
					</div>
				))
			}
		</div>
	)
}

export default Levels
