import { classNames } from "../utils";

export const BellIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
		/>
	</svg>
);

export const HomeIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
		/>
	</svg>
);

export const ChevronRightIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8.25 4.5l7.5 7.5-7.5 7.5"
		/>
	</svg>
);

export const ChevronDownIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.5 8.25l-7.5 7.5-7.5-7.5"
		/>
	</svg>
);

export const UsersIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
	</svg>
);

export const ExclamationTriangleIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className={classNames("w-6 h-6", className ?? "")}
		{...restOfProps}
	>
		<path
			fillRule="evenodd"
			d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
			clipRule="evenodd"
		/>
	</svg>
);

export const AvatarPlaceHolderIcon = ({ className, ...restOfProps }) => (
	<span
		className={classNames(
			"inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100",
			className ?? ""
		)}
		{...restOfProps}
	>
		<svg
			className="h-full w-full text-gray-300"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	</span>
);

export const ArrowUTurnBackIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className={classNames("w-5 h-5", className ?? "")}
		{...restOfProps}
	>
		<path
			fillRule="evenodd"
			d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
			clipRule="evenodd"
		/>
	</svg>
);

export const ArrowLeftIcon = ({ className, ...restOfProps }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		className={classNames("w-5 h-5", className ?? "")}
		{...restOfProps}
	>
		<path
			fillRule="evenodd"
			d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
			clipRule="evenodd"
		/>
	</svg>
);
