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
		<>
			<p> Levels </p>
			<div className="levels flex flex-column justify-center align-center" style={{ height: "30%" }}>
				{
					levels.map((item, index) => (
						<div className="full-width">
							<div className="full-width margin flex justify-space-around" key={index} onClick={() => setLevel(levels[index])}>
								<div>{item.name}</div> <div>{item.creator}</div>
							</div>
							<hr />
						</div>
					))
				}
			</div>
		</>
	)
}

export default Levels
