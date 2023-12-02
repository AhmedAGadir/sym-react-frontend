import { Link } from "react-router-dom";
import { HomeIcon, ChevronRightIcon } from "./Icons";
import { classNames, capitalize } from "../utils";

const BreadCrumb = ({ pages }) => {
	return (
		<nav className="flex" aria-label="Breadcrumb">
			<ol className="flex items-center space-x-4">
				<li>
					<div>
						<Link to="/" className="text-gray-400 hover:text-gray-500">
							<HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
							<span className="sr-only">Home</span>
						</Link>
					</div>
				</li>
				{pages.map((page) => (
					<li key={page.name}>
						<div className="flex items-center">
							<ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
							<Link
								to={page.current ? "#" : page.href}
								className={classNames(
									"ml-4 text-sm font-medium ",
									page.current
										? "text-indigo-500"
										: "text-gray-500 hover:text-gray-700"
								)}
								aria-current={page.current ? "page" : undefined}
							>
								{/* split any hyphens and then join with spaces and capitalise*/}
								{page.name.split("-").map(capitalize).join(" ")}
							</Link>
						</div>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default BreadCrumb;
