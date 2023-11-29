import React, { useMemo, useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import Spinner from "./components/Spinner";
import organizationService from "./services/organizationService";
import { teamNameFormatter, getTeamId } from "./utils";

const Home = () => {
	return <h1 className="text-3xl font-bold text-blue-500">Home</h1>;
};

const Team = ({ organization }) => {
	const { teamId } = useParams();
	const teamMembers = organization.teams.find(
		(team) => getTeamId(team.teamName) === teamId
	).members;
	return <h1 className="text-3xl font-bold text-blue-500">Team</h1>;
};

export default function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ isError: false, message: "" });
	const [organization, setOrganization] = useState(null);

	// const organizationService = useMemo(() => createOrganizationService(), []);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await organizationService.getOrganization();
				console.log("data", data);
				if (mounted) {
					setOrganization(data.organization);
					setLoading(false);
				}
			} catch (error) {
				console.log("error", error);
				setError({ isError: true, message: error.message });
				setLoading(false);
			}
		};

		fetchData();
		return () => {
			mounted = false;
		};
	}, []);

	console.log("loading", loading);
	if (loading) {
		return <Spinner />;
	}

	console.log("error.isError", error.isError);

	if (error.isError) {
		return (
			<h1 className="text-3xl font-bold text-red-500">
				{/* copilot for the default error message */}
				{error.message ?? "An error occurred!"}
			</h1>
		);
	}

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/team/:teamId"
						element={<Team organization={organization} />}
					/>
				</Routes>

				<h1 className="text-3xl font-bold text-blue-500">
					{organization.name}
				</h1>

				{/* <Routes>
				{organization.teams.map((team) => (
					<Route
						path={`/${teamNameFormatter(team.teamName)}`}
						// element={<Team team={team} />}
						element={<div>{team.teamName}</div>}
						key={team.teamName}
					/>
				))}
			</Routes> */}

				{/* <Route path="/" element={<Home />} />
			<Route path="/books" element={<BookList />} /> */}
				{/* <nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						{organization.teams.map(({ teamName }) => (
							<li key={teamNameFormatter(teamName)}>
								<Link to={`/${teamNameFormatter(teamName)}`}>
									{teamNameFormatter(teamName, false)}
								</Link>
							</li>
						))}
					</ul>
				</nav> */}
				{/* 
			<h1 className="text-3xl font-bold text-blue-500">{organization.name}</h1>

			<div className="flex flex-wrap justify-center items-center">
				{organization.teams.map((team) => (
					<div
						key={team.teamName}
						className="border-2 border-blue-500 rounded-lg p-4 m-4"
					>
						<h2 className="text-xl font-bold text-blue-500">
							{teamNameFormatter(team.teamName, false)}
						</h2>
						<div className="flex justify-between items-center">
							<p className="text-sm text-blue-500">
								Team Lead:{" "}
								{team.members.find((member) => member.isTeamLead).firstName}
							</p>
							<p className="text-sm text-blue-500">
								Members: {team.members.length}
							</p>
							<Link
								to={`/${teamNameFormatter(teamNameFormatter(team.teamName))}`}
								className="text-sm text-blue-500"
							>
								See more
							</Link>
						</div>
					</div>
				))}
			</div> */}

				{/* <div className="flex flex-wrap justify-center items-center">
				{organization.teams.map((team) => (
					<div
						key={team.teamName}
						className="border-2 border-blue-500 rounded-lg p-4 m-4"
					>
						<h2 className="text-xl font-bold text-blue-500">{team.name}</h2>
						<div className="flex justify-center items-center">
							{team.members.map((member) => (
								<div
									key={member.email}
									className="border-2 border-blue-500 rounded-lg p-4 m-4"
								>
									<h3 className="text-lg font-bold text-blue-500">
										{member.firstName} {member.lastName}
									</h3>
									<p className="text-blue-500">{member.email}</p>
									<p className="text-blue-500">{member.startDate}</p>
									<p className="text-blue-500">
										{member.isTeamLead ? "Team Lead" : "Team Member"}
									</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div> */}
			</Router>
		</>
	);
}
