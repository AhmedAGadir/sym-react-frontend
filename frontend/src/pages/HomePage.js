import React, { useMemo } from "react";
import Spinner from "../components/Spinner";
import { capitalize, teamNameFormatter } from "../utils";
import { Link } from "react-router-dom";

const HomePage = ({ organization, loading, error }) => {
	const teamsSummary = useMemo(() => {
		if (!organization) return [];
		return organization.teams.map((team) => {
			const teamName = teamNameFormatter(team.teamName);
			const teamLead = team.members.find((member) => member.isTeamLead);
			const teamLeadName = teamLead
				? `${teamLead.firstName} ${teamLead.lastName}`
				: null;
			return {
				name: capitalize(teamName),
				lead: teamLeadName,
				href: `/team/${teamName}`,
			};
		});
	}, [organization]);

	return (
		<div>
			{loading && <Spinner className="mt-4" />}
			{error && (
				<h1 className="text-3xl font-bold text-red-500">An error occurred</h1>
			)}
			{organization && (
				<ul className="divide-y divide-gray-100">
					{teamsSummary.map((team) => (
						<li
							key={team.name}
							className="flex items-center justify-between gap-x-6 py-5"
						>
							<div className="min-w-0">
								<div className="flex items-start gap-x-3">
									<p className="text-md font-semibold leading-6 text-gray-900">
										{team.name}
									</p>
								</div>
								<div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
									<p className="truncate">Lead by {team.lead}</p>
								</div>
							</div>
							<div className="flex flex-none items-center gap-x-4">
								<Link
									to={team.href}
									className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
								>
									View Team<span className="sr-only">, {team.name}</span>
								</Link>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default HomePage;
