import companyLogo from "../assets/images/company-logo.png";
import avatar from "../assets/images/avatar.webp";
import BreadCrumb from "./BreadCrumb";
import { ArrowLeftIcon, BellIcon } from "./Icons";
import { capitalize } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { isNotEmptyString } from "../utils";

const INVALID_ROUTES = ["team", "member"];

const user = {
	name: "Ahmed Gadir",
	email: "ahmed.gadir@email.com",
	imageSrc: avatar,
};

const Layout = ({ title, children }) => {
	const location = useLocation();

	const pathnames = location.pathname.split("/").filter(isNotEmptyString);

	const pages =
		pathnames
			.map((pathname, ind) => {
				const name =
					pathnames[ind - 1] === "team"
						? `Team ${capitalize(pathname)}`
						: capitalize(pathname);
				const href = `/${pathnames.slice(0, ind + 1).join("/")}`;
				const current = ind + 1 === pathnames.length;

				return { name, href, current };
			})
			.filter((page) => !INVALID_ROUTES.includes(page.name.toLowerCase())) ??
		[];

	const navigate = useNavigate();

	const onHomePage = location.pathname === "/";

	const onBackButtonClick = () => {
		const segments = location.pathname.split("/").filter(isNotEmptyString);
		if (segments.length > 1) {
			segments.pop();
			// if were going to go back to an invalid Route, then move even one step back
			// otherwise just move one step back
			if (
				INVALID_ROUTES.includes(segments[segments.length - 1].toLowerCase())
			) {
				segments.pop();
			}

			const previousPath = segments.join("/");
			navigate(previousPath);
		}
	};

	return (
		<>
			<div className="min-h-full">
				<div className="bg-gray-800 pb-32">
					<nav className="bg-gray-800">
						<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
							<div className="border-b border-gray-700">
								<div className="flex h-16 items-center justify-between px-4 sm:px-0">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<img
												className="h-8 w-8"
												src={companyLogo}
												alt="company logo"
											/>
										</div>
									</div>
									<div className="flex items-center">
										<button className="relative rounded-full bg-gray-800 p-1 text-gray-400">
											<BellIcon className="h-6 w-6" aria-hidden="true" />
										</button>
										<button className="flex-shrink-0 ml-2">
											<img
												className="h-8 w-8 rounded-full"
												src={user.imageSrc}
												alt="user avatar"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</nav>
					<header className="py-10">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold tracking-tight text-white">
								{title}
							</h1>
							<div className="mt-4">
								<BreadCrumb pages={pages} />
							</div>
						</div>
					</header>
				</div>

				<main className="-mt-32">
					<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
						<div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6 relative">
							{!onHomePage && (
								<div
									onClick={onBackButtonClick}
									className="text-gray-900 hover:text-indigo-500 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition absolute -left-2 top-6 lg:-left-6"
								>
									<ArrowLeftIcon className="w-5 h-5" />
								</div>
							)}
							{children}
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default Layout;
