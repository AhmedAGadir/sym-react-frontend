import React from "react";
import { classNames } from "../utils";

const alertStyles = {
	success: "text-green-800 bg-green-50",
	danger: "text-red-800 bg-red-50",
};

const Alert = ({ type, children }) => {
	return (
		<div
			className={classNames("p-4 mb-4 text-sm rounded-lg", alertStyles[type])}
			role="alert"
		>
			{children}
		</div>
	);
};

export default Alert;
