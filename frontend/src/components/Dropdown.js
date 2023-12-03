import React from "react";

const Dropdown = ({ id, options, onChange }) => {
	return (
		<>
			<label htmlFor={id} className="sr-only">
				{id}
			</label>
			<select
				id={id}
				className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:text-gray-900"
				// className="pl-2 block min-w-0 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
