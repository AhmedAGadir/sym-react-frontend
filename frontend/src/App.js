import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Layout from "./components/Layout";
import Modal from "./components/Modal";
import useOrganizationData from "./hooks/useOrganizationData";
import {
	HomePage,
	TeamPage,
	MemberPage,
	TeamRedirectPage,
	MemberRedirectPage,
} from "./pages";
import Loader from "./components/Loader";
import { classNames } from "./utils";

export default function App() {
	const { organization, loading, error, updateTeams, refetch } =
		useOrganizationData();

	if (error) {
		return (
			<Router>
				<Layout>
					<Modal
						message={error.message}
						renderButton={() => (
							<div className="flex items-center justify-end p-4 md:p-5 rounded-b">
								{loading && <Spinner className="w-8 h-8 mr-3" />}
								<button
									data-modal-hide="static-modal"
									type="button"
									onClick={refetch}
									className={classNames(
										"text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-1 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5",
										loading && "opacity-50 cursor-not-allowed"
									)}
									disabled={loading}
								>
									Try again
								</button>
							</div>
						)}
					/>
				</Layout>
			</Router>
		);
	}

	if (loading) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner className="!w-16 !h-16" />
			</div>
		);
	}

	return (
		<Router>
			<Layout title={organization.name}>
				<Routes>
					<Route
						path="/"
						element={
							<HomePage organization={organization} updateTeams={updateTeams} />
						}
					/>
					{/* /team will redirect to home for simplicities sake */}
					<Route path="/team" element={<TeamRedirectPage />} />
					<Route
						path="/team/:teamId"
						element={
							<TeamPage organization={organization} updateTeams={updateTeams} />
						}
					/>
					{/* /team/:teamId/member will redirect to /team/:teamId for simplicities sake */}
					<Route path="/team/:teamId/member" element={<MemberRedirectPage />} />
					<Route
						path="/team/:teamId/member/:memberId"
						element={<MemberPage />}
					/>
					<Route path="*" element={<h1>Page Not Found</h1>} />
				</Routes>
			</Layout>
		</Router>
	);
}
