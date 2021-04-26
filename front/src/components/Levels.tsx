import React, { useContext, useEffect, useState } from 'react'
import API_PATH from '../env'
import { Level } from '../types'
import axios from 'axios'
import { LevelContext } from '../contexts/contexts'


const Levels = () => {

	const { setLevel } = useContext(LevelContext)
	const [levels, setLevels] = useState<Level[]>([])

	const getLevels = async () => {
		try {
			let { data: { data } } = await axios.post(`${API_PATH}/graphql`, {
				query:
					`{
							levels {
								id,
								name,
								endcode,
								startcode,
								creator
							}
						}`
			})

			setLevels(data['levels'])
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
