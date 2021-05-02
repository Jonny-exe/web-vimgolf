import React, { useEffect } from 'react'
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim"

interface Props {
	writeable: boolean;
	code: string;
	setCode: (value: string) => void;
	reset: () => void;
}

const Editor: React.FC<Props> = ({ reset, writeable, code, setCode }) => {
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

	return (
		<div onClick={reset} className={`editor`} >
			<AceEditor
				placeholder="Placeholder Text"
				mode="javascript"
				theme="github"
				name="hola"
				onChange={handleChange}
				onPaste={() => false}
				readOnly={!writeable}
				highlightActiveLine={true}
				value={code}
				setOptions={{
					showLineNumbers: true,
					tabSize: 2,
					keyboardHandler: "ace/keyboard/vim"
				}} />
		</div>
	)
}

export default Editor