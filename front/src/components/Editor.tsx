import React from 'react'
import AceEditor from 'react-ace'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim"

const Editor = () => {
	return (
		<div className="editor">
			<AceEditor
				placeholder="Placeholder Text"
				mode="javascript"
				theme="github"
				name="hola"
				highlightActiveLine={true}
				value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
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