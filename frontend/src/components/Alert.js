import React from "react";
import { classNames } from "../utils";

export const alertType = {
	SUCCESS: "success",
	DANGER: "danger",
	WARNING: "warning",
};

const alertStyles = {
	[alertType.SUCCESS]: "text-green-800 bg-green-50",
	[alertType.DANGER]: "text-red-800 bg-red-50",
	[alertType.WARNING]: "text-yellow-800 bg-yellow-50",
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
