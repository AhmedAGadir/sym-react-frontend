import React from "react";
import { classNames } from "../utils";

const Dropdown = ({ id, options, onChange, disabled }) => {
	return (
		<>
			<label htmlFor={id} className="sr-only">
				{id}
			</label>
			<select
				id={id}
				className={classNames(
					"block py-2.5 font-medium px-0 w-full flex-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:text-indigo-500",
					disabled && "opacity-50 cursor-not-allowed"
				)}
				onChange={onChange}
				value={options.find((option) => option.selected).value}
				disabled={disabled}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</>
	);
};

export default Dropdown;
