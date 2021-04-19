import React, { useState } from 'react'
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
	const handleChange = (value: string) => {
		setCode(value)
	}

	return (
		<div className={`editor ${!writeable ? "ignore-pointer-events" : ""}`}>
			<AceEditor
				placeholder="Placeholder Text"
				mode="javascript"
				theme="github"
				name="hola"
				onChange={handleChange}
				focus={writeable}
				readOnly={!writeable}
				highlightActiveLine={true}
				value={code}
				width={`${window.innerWidth / 2}px`}
				height={`${window.innerHeight / 2}px`}
				setOptions={{
					showLineNumbers: true,
					tabSize: 2,
					keyboardHandler: "ace/keyboard/vim"
				}} />
		</div>
	)
}

export default Editor