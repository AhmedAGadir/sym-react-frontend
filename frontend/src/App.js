import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Layout from "./components/Layout";
import useOrganizationData from "./hooks/useOrganizationData";
import {
	HomePage,
	TeamPage,
	MemberPage,
	TeamRedirectPage,
	MemberRedirectPage,
} from "./pages";

export default function App() {
	const { organization, loading, error, updateTeams } = useOrganizationData();

	if (loading) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Spinner className="!w-16 !h-16" />
			</div>
		);
	}

	if (error) {
		return (
			<h1 className="text-3xl font-bold text-red-500">An error occurred</h1>
		);
	}

	return (
		<Router>
			<Layout name={organization.name}>
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
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</Layout>
		</Router>
	);
}
