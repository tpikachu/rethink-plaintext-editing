import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import css from "../../styles/PlaintextEditor.module.css";

import path from "path";

const CKEditorDynamic = dynamic(() => import("ckeditor4-react"), { ssr: false });

function PlaintextEditor({ file, write }) {
	const [ text, setText ] = useState("");
	console.log(file, write);

	useEffect(() => {
		file.text().then((res) => {
			console.log("res");
			setText(res);
		});
	});

	return (
		<div className={css.editor}>
			<div className={css.title}>{path.basename(file.name)}</div>
			<CKEditorDynamic data={text} />
		</div>
	);
}

PlaintextEditor.propTypes = {
	file: PropTypes.object,
	write: PropTypes.func
};

export default PlaintextEditor;
