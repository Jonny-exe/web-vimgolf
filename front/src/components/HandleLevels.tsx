import React, { useContext, useState } from 'react'
import { ModalValues } from '../types'
import { UsernameContext } from '../contexts/contexts'
import API_PATH from '../env'
import axios from 'axios'

const HandleLevels: React.FC = () => {
	const { username } = useContext(UsernameContext)
	const [isOverlayActive, setIsOverlayActive] = useState(false)
	const [modalValues, setModalValues] = useState<ModalValues>({ startcode: "", endcode: "", name: "" })

	const addLevel = () => {
		setIsOverlayActive(true)
	}

	const submitLevel = () => {
		const { endcode, startcode, name } = modalValues
		axios.post(`${API_PATH}/graphql`, {
			query: `{
				insertlevel(name: "${name}", creator: "${username}", startcode: "${startcode}", endcode: "${endcode}") {
					id
				}
			}`
		})
		setIsOverlayActive(false)
	}

	const handleInputChange = (value: string, type: string) => {
		setModalValues({ ...modalValues, [type]: value })
	}

	return (
		<>
			<button onClick={addLevel}>Add level</button>
			<div className={`overlay ${isOverlayActive ? 'active' : 'hidden'}`} onClick={() => setIsOverlayActive(false)}></div>
			<div className={`modal flex flex-column align-center justify-center ${isOverlayActive ? 'active' : 'hidden'}`}>
				<p>
					Create a new level:
				</p>
				1. Insert a level name
				<p>
					<input value={modalValues.name} onChange={(e: any) => handleInputChange(e.target.value, "name")} type="text" placeholder="levelname"></input>
				</p>
				2. Add the begging state of the level
				<p>
					<textarea value={modalValues.startcode} onChange={(e: any) => handleInputChange(e.target.value, "startcode")}></textarea>
				</p>
				3. Add the end state of the level
				<p>
					<textarea value={modalValues.endcode} onChange={(e: any) => handleInputChange(e.target.value, "endcode")}></textarea>
				</p>
				<button className="normal" onClick={submitLevel}>Submit</button>
			</div>
		</>
	)
}

export default HandleLevels
