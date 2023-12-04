import React from "react";
import { ArrowLeftIcon } from "./Icons";
import { Link } from "react-router-dom";
import { classNames } from "../utils";

const BackButton = ({ to = "#", className }) => {
	return (
		<Link
			to={to}
			className={classNames(
				"text-gray-900 hover:text-indigo-500 relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition",
				className ?? ""
			)}
		>
			<ArrowLeftIcon className="w-5 h-5" />
		</Link>
	);
};

export default BackButton;
