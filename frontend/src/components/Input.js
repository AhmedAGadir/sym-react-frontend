import { classNames } from "../utils";

export const InputWithAddOn = ({
	id,
	placeholder,
	value,
	onChange,
	addOn,
	required = false,
	disabled,
}) => (
	<div>
		<label htmlFor={id} className="sr-only">
			{id}
		</label>
		<div className="mt-2 flex">
			<span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
				{addOn}
			</span>
			<input
				type="text"
				className={classNames(
					"pl-2 block min-w-0 rounded-none rounded-r-md font-medium border-0 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
					disabled && "opacity-50 cursor-not-allowed"
				)}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				name={id}
				id={id}
				disabled={disabled}
			/>
		</div>
	</div>
);

export const Input = ({
	id,
	placeholder,
	value,
	onChange,
	required = false,
	disabled,
	className,
	label,
	type = "text",
}) => (
	<div>
		<label
			htmlFor={id}
			className="block text-sm font-medium leading-6 text-gray-900"
		>
			{label}
		</label>
		<div className="mt-2 flex">
			<input
				type={type}
				className={classNames(
					"px-2 block min-w-0 rounded-md font-medium border-0 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
					disabled && "opacity-50 cursor-not-allowed",
					className ?? ""
				)}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				name={id}
				id={id}
				disabled={disabled}
			/>
		</div>
	</div>
);
