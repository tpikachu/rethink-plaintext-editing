import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import css from "../../styles/MarkdownEditor.module.css";
import path from "path";

import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
	ssr: false
});

function MarkdownEditor({ file, write }) {
	const [ value, setValue ] = useState("");
	const mdParser = new MarkdownIt();

	useEffect(() => {
		file.text().then((res) => {
			setValue(res);
		});
	}, []);

	const handleEditorChange = ({ html, text }) => {
		setValue(text);
	};

	return (
		<div className={css.editor}>
			<div className={css.title}>{path.basename(file.name)}</div>
			<MdEditor
				value={value}
				style={{ height: "500px" }}
				renderHTML={(text) => mdParser.render(text)}
				onChange={handleEditorChange}
			/>
		</div>
	);
}
// value={value}
// style={{ height: "500px" }}
// renderHTML={(text) => mdParser.render(text)}
// onChange={handleEditorChange}
MarkdownEditor.propTypes = {
	file: PropTypes.object,
	write: PropTypes.func
};

export default MarkdownEditor;
