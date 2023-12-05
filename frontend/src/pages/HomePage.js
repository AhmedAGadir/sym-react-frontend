import React, { useMemo } from "react";
import { capitalize, getTeamId } from "../utils";
import { Link } from "react-router-dom";
import { UsersIcon } from "../components/Icons";

const HomePage = ({ organization }) => {
	const teamsSummary = useMemo(() => {
		if (!organization) return [];
		return organization.teams
			.map((team) => {
				const teamId = getTeamId(team.teamName);
				const teamLead = team.members?.find((member) => member.isTeamLead);
				return {
					name: capitalize(teamId),
					memberCount: team.members.length,
					lead: `${teamLead.firstName} ${teamLead.lastName}`,
					href: `/team/${teamId}`,
				};
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [organization]);

	return (
		<div>
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
									<p className="truncate">
										Lead by <span className="text-gray-700">{team.lead}</span>
									</p>
								</div>
							</div>
							<div className="flex flex-none items-center gap-x-4">
								<p className="whitespace-nowrap text-gray-500">
									<UsersIcon className="inline w-4 h-4 mr-1" />
									<span className="text-sm">{team.memberCount}</span>
								</p>
								<Link
									to={team.href}
									className="rounded-md bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
