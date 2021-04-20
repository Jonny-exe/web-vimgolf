import React, { useEffect, useState } from 'react'
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim"

interface Props {
	writeable: boolean;
	code: string;
	setCode: (value: string) => void;
}

const Editor: React.FC<Props> = ({ writeable, code, setCode }) => {
	const [focus, setFocus] = useState(true)
	const handleChange = (value: string) => {
		setCode(value)
	}

	const stopPaste = (e: any) => {
		e.stopPropagation(); e.preventDefault(); console.log(e)
	}

	useEffect(() => {
		window.addEventListener("paste", stopPaste , true)
		return () => {
			window.removeEventListener("paste", stopPaste , true)
		}
	}, [])

	const onClick = () => {
		setFocus(true)
	}

	return (
		<div onClick={onClick} className={`editor`} >
			<AceEditor
				placeholder="Placeholder Text"
				mode="javascript"
				theme="github"
				name="hola"
				onChange={handleChange}
				focus={focus}
				onPaste={() => false}
				onFocus={() => setFocus(false)}
				readOnly={!writeable}
				highlightActiveLine={true}
				value={code}
				// width={`${window.innerWidth / 3}px`}
				// height={`${window.innerHeight / 1.2}px`}
				setOptions={{
					showLineNumbers: true,
					tabSize: 2,
					keyboardHandler: "ace/keyboard/vim"
				}} />
		</div>
	)
}

export default Editor