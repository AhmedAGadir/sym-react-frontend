export const InputWithAddOn = ({ placeholder, value, onChange, addOn }) => (
	<div className="mt-2 flex rounded-md shadow-sm">
		<span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
			{addOn}
		</span>
		<input
			type="text"
			className="pl-2 block min-w-0 rounded-none rounded-r-md border-0 py-1.5 focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	</div>
);