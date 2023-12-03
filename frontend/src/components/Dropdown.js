import React from "react";

const Dropdown = ({ id, options, onChange }) => {
	return (
		<>
			<label htmlFor={id} className="sr-only">
				{id}
			</label>
			<select
				id={id}
				className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 focus:outline-none focus:ring-0 focus:border-slate-500 focus:text-slate-500"
				onChange={onChange}
				value={options.find((option) => option.selected).value}
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
