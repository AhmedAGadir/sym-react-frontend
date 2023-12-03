import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
	capitalize,
	classNames,
	memberNameFormatter,
	teamNameFormatter,
} from "../utils";
import Spinner from "../components/Spinner";
import Dropdown from "../components/Dropdown";

const TeamPage = ({ organization, loading, error }) => {
	const { teamId } = useParams();

	const teamNotFound = useMemo(() => {
		if (!organization) return false;
		return organization.teams.every(
			(team) => teamNameFormatter(team.teamName) !== teamId
		);
	}, [organization, teamId]);

	const members = useMemo(() => {
		const team =
			organization?.teams.find(
				(team) => teamNameFormatter(team.teamName) === teamId
			) ?? {};

		return team.members
			?.sort((a, b) => {
				if (a.isTeamLead) return -1;
				if (b.isTeamLead) return 1;
				return 0;
			})
			.map((member) => ({
				...member,
				team: teamNameFormatter(team.teamName, false),
			}));
	}, [organization, teamId]);

	const [editing, setEditing] = useState(false);
	const [editingMembers, setEditingMembers] = useState([]);

	const startEditing = () => {
		const membersCopy = members.map((member) => ({ ...member }));
		setEditingMembers(membersCopy);
		setEditing(true);
	};

	const stopEditing = (saveChanges) => {
		if (saveChanges) {
			// update state via API call using editingMembers state
		}
		setEditing(false);
		setEditingMembers([]);
	};

	const displayMembers = useMemo(
		() => (editing ? editingMembers : members),
		[editing, editingMembers, members]
	);

	// dropdown options for team selection
	const allTeams = useMemo(() => {
		if (!organization) return [];
		return organization.teams.map((team) =>
			teamNameFormatter(team.teamName, false)
		);
	}, [organization]);

	const onTeamChange = (memberInd, team) => {
		const updatedMembers = [...editingMembers];
		updatedMembers[memberInd].team = team;
		setEditingMembers(updatedMembers);
	};

	return (
		<div>
			{loading && <Spinner className="mt-4" />}
			{error && (
				<h1 className="text-3xl font-bold text-red-500">An error occurred</h1>
			)}
			{teamNotFound && (
				<h1 className="text-3xl font-bold text-red-500">Team not found</h1>
			)}
			{!teamNotFound && organization && (
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto">
							<h1 className="text-base font-semibold leading-6 text-gray-900">
								Team {capitalize(teamId)}
							</h1>
							<p className="mt-2 text-sm text-gray-700">
								lorem ipsum dolor sit amet consectetur adipisicing elit
							</p>
						</div>
						<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
							{!editing && (
								<button
									onClick={startEditing}
									className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
									// 	? " bg-indigo-400 hover:bg-indigo-300 focus-visible:outline-indigo-400"
								>
									Edit Team
								</button>
							)}
							{editing && (
								<div className="flex gap-x-2">
									<button
										onClick={() => stopEditing(false)}
										className="rounded-md bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									>
										Cancel
									</button>
									<button
										onClick={() => stopEditing(true)}
										className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
										// 	? " bg-indigo-400 hover:bg-indigo-300 focus-visible:outline-indigo-400"
									>
										Save
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="mt-8 flow-root">
						<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
								{/*  */}
								<table className="min-w-full divide-y divide-gray-300">
									<thead>
										<tr>
											<th
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
											>
												Name
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Role
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Team
											</th>
											<th
												scope="col"
												className="relative py-3.5 pl-3 pr-4 sm:pr-0"
											>
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{displayMembers.map((member, memberInd) => (
											<tr key={member.email}>
												<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
													<div>
														<div className="font-medium text-gray-900">
															{member.firstName} {member.lastName}
														</div>
														<div className="hidden sm:block mt-1 text-gray-500">
															{member.email}
														</div>
													</div>
												</td>
												<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
													{member.isTeamLead ? "Team Lead" : "Member"}
												</td>
												<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
													{editing ? (
														<Dropdown
															id={`team-${member.email}`}
															options={allTeams.map((team) => ({
																value: team,
																label: team,
																selected: team === member.team,
															}))}
															onChange={(e) =>
																onTeamChange(memberInd, e.target.value)
															}
														/>
													) : (
														member.team
													)}
												</td>
												<td className="relative py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
													<Link
														to={
															editing
																? "#"
																: `/team/${teamId}/member/${memberNameFormatter(
																		member.firstName,
																		member.lastName
																  )}`
														}
														className={classNames(
															"rounded-md bg-white px-2.5 py-1.5 font-semibold  shadow-sm ring-1 ring-inset ring-gray-300",
															editing
																? "cursor-not-allowed text-gray-400"
																: "text-gray-900 hover:bg-gray-50"
														)}
													>
														View
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamPage;
