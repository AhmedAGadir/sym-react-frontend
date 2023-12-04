import React from "react";

const EditableContainer = ({ children, editing, onSubmit }) => {
	return editing ? (
		<form onSubmit={onSubmit}>{children}</form>
	) : (
		<div>{children}</div>
	);
};

export default EditableContainer;
