import React, { useState } from 'react'
import { ModalValues } from '../types'
import axios from 'axios'
import { userInfo } from 'node:os'

interface Props {
	user: string;
}

const HandleLevels: React.FC<Props> = ({ user }) => {
	const [isOverlayActive, setIsOverlayActive] = useState(false)
	const [modalValues, setModalValues] = useState<ModalValues>({ start_code: "", end_code: "", name: "" })

	const addLevel = () => {
		setIsOverlayActive(true)
	}

	const submitLevel = () => {
		const { end_code, start_code, name } = modalValues
		axios.post("http://localhost:8080/levels", { creator: user, end_code, start_code, name })
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
					<textarea value={modalValues.start_code} onChange={(e: any) => handleInputChange(e.target.value, "start_code")}></textarea>
				</p>
				3. Add the end state of the level
				<p>
					<textarea value={modalValues.end_code} onChange={(e: any) => handleInputChange(e.target.value, "end_code")}></textarea>
				</p>
				<button className="invert" onClick={submitLevel}>Submit</button>
			</div>
		</>
	)
}

export default HandleLevels