import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	capitalize,
	classNames,
	formatTeamName,
	memberNameFormatter,
	getTeamId,
} from "../utils";
import Spinner from "../components/Spinner";
import Dropdown from "../components/Dropdown";
import getTeamValidationErrors from "../getTeamValidationErrors";
import { InputWithAddOn } from "../components/Input";
import Alert from "../components/Alert";

const ROLES = {
	TEAM_LEAD: "Team Lead",
	MEMBER: "Member",
};

const TeamContainer = ({ children, editing, onSubmit }) => {
	return editing ? (
		<form onSubmit={onSubmit}>{children}</form>
	) : (
		<div>{children}</div>
	);
};

const TeamPage = ({ organization, loading, error, updateTeams }) => {
	const { teamId } = useParams();
	const navigate = useNavigate();

	const team = useMemo(
		() =>
			organization?.teams.find((team) => getTeamId(team.teamName) === teamId) ??
			null,
		[organization, teamId]
	);

	const members = useMemo(
		() =>
			team?.members
				?.sort((a, b) => {
					if (a.isTeamLead) return -1;
					if (b.isTeamLead) return 1;
					return 0;
				})
				.map((member) => ({
					...member,
					team: team.teamName,
				})) ?? [],
		[team]
	);

	const [editing, setEditing] = useState(false);
	const [editingTeamName, setEditingTeamName] = useState("");
	const [editingMembers, setEditingMembers] = useState([]);
	const [saveStatus, setSaveStatus] = useState(null);

	const startEditing = () => {
		setSaveStatus(null);

		const membersCopy = members.map((member) => ({ ...member }));
		setEditingTeamName(capitalize(teamId));
		setEditingMembers(membersCopy);
		setEditing(true);
	};

	const stopEditing = (saveChanges) => {
		if (saveChanges) {
			// const updatedTeamName = editingTeamName ? `Team ${str
			//     .trim()
			//     .match(/\b(\w+)/g)
			//     .map(capitalize)
			//     .join(" "}` : "";

			// const editingTeamData = {
			// 	teamName: formatTeamName(editingTeamName),
			// 	members: editingMembers,
			// };
			// const otherTeamData = organization.teams.filter(
			// 	(team) => getTeamId(team.teamName) !== teamId
			// );
			// const validationErrors = getTeamValidationErrors(
			// 	editingTeamData,
			// 	otherTeamData
			// );

			// if (validationErrors.length > 0) {
			// 	console.log("alert props", {
			// 		success: false,
			// 		message: validationErrors,
			// 	});
			// 	setSaveStatus({ success: false, message: validationErrors });
			// 	return;
			// }

			// const validation = {
			//     teamHasName:
			// };
			const validationErrors = [];

			// update state via API call using editingMembers state
			const teamInd = organization.teams.findIndex(
				(team) => getTeamId(team.teamName) === teamId
			);
			const updatingTeams = organization.teams.map((team) => ({ ...team }));
			const updatingEditingTeam = updatingTeams[teamInd];
			const otherUpdatingTeams = updatingTeams.filter(
				(_, ind) => ind !== teamInd
			);

			if (!editingTeamName) {
				validationErrors.push("Team must have a name");
			}

			const updatedTeamName = editingTeamName
				? `Team ${editingTeamName
						.trim()
						.match(/\b(\w+)/g)
						.map(capitalize)
						.join(" ")}`
				: "";

			otherUpdatingTeams.forEach((team) => {
				if (team.teamName === updatedTeamName) {
					validationErrors.push("Team name already exists");
				}
			});

			// move team members to other teams
			// editingMembers.forEach((member) => {
			//     const teamInd

			// updateTeam(teamInd, updatedTeam);

			// updateTeam

			setSaveStatus({ success: true, message: "Team updated successfully" });

			// this could be improved to navigate to the new team page
			// if (editingTeamName !== teamId) {
			// 	navigate("/");
			// }
		}
		setEditing(false);
		setEditingTeamName("");
		setEditingMembers([]);
	};

	const displayingMembers = useMemo(
		() => (editing ? editingMembers : members),
		[editing, editingMembers, members]
	);

	const onEditingFieldChanged = (memberInd, field, newValue) => {
		const updatedEditingMembers = [...editingMembers];
		updatedEditingMembers[memberInd][field] = newValue;
		setEditingMembers(updatedEditingMembers);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		console.log("editingTeamName", editingTeamName);
		if (editingTeamName === "") {
			alert("here");
			return;
		}
		stopEditing(true);
	};

	return (
		<div>
			{loading && <Spinner className="mt-4" />}
			{error && (
				<h1 className="text-3xl font-bold text-red-500">An error occurred</h1>
			)}
			{!team && (
				<h1 className="text-3xl font-bold text-red-500">Team not found</h1>
			)}
			{members.length > 0 && (
				<TeamContainer editing={editing} onSubmit={onFormSubmit}>
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								{!editing && (
									<div>
										<h1 className="text-base font-semibold leading-6 text-gray-900">
											Team {capitalize(teamId)}
										</h1>
										<p className="mt-2 text-sm text-gray-700">
											lorem ipsum dolor sit amet consectetur adipisicing elit
										</p>
									</div>
								)}
								{editing && (
									<div>
										<InputWithAddOn
											id={`${teamId}-team-name`}
											placeholder="Team Name"
											value={editingTeamName}
											onChange={(e) => setEditingTeamName(e.target.value)}
											addOn="Team"
											required
										/>
									</div>
								)}
							</div>

							<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
								{!editing && (
									<button
										type="button"
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
											type="button"
											onClick={() => stopEditing(false)}
											className="rounded-md bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
										>
											Save
										</button>
									</div>
								)}
							</div>
						</div>
						<div className="mt-3">
							{saveStatus && saveStatus.success && (
								<Alert type="success">{saveStatus.message}</Alert>
							)}
							{saveStatus && !saveStatus.success && (
								<Alert type="danger">
									<div className="flex">
										<div>
											<span className="font-medium">
												Ensure that these requirements are met:
											</span>
											<ul className="mt-1.5 list-disc list-inside">
												{saveStatus.message.map((msg) => (
													<li key={msg}>{msg}</li>
												))}
											</ul>
										</div>
									</div>
								</Alert>
							)}
						</div>
						<div className="mt-8 flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
											{displayingMembers.map((member, memberInd) => (
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
														{editing && (
															<Dropdown
																id={`${member.email}-role`}
																options={
																	Object.values(ROLES).map((role) => ({
																		value: role,
																		label: role,
																		selected:
																			role ===
																			(member.isTeamLead
																				? ROLES.TEAM_LEAD
																				: ROLES.MEMBER),
																	})) ?? []
																}
																onChange={(e) =>
																	onEditingFieldChanged(
																		memberInd,
																		"isTeamLead",
																		e.target.value === ROLES.TEAM_LEAD
																	)
																}
															/>
														)}
														{!editing && (
															<span>
																{member.isTeamLead
																	? ROLES.TEAM_LEAD
																	: ROLES.MEMBER}
															</span>
														)}
													</td>
													<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
														{editing ? (
															<Dropdown
																id={`${member.email}-team`}
																options={
																	organization.teams?.map(({ teamName }) => ({
																		value: teamName,
																		label: capitalize(getTeamId(teamName)),
																		selected: teamName === member.team,
																	})) ?? []
																}
																onChange={(e) =>
																	onEditingFieldChanged(
																		memberInd,
																		"team",
																		e.target.value
																	)
																}
															/>
														) : (
															capitalize(getTeamId(member.team))
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
				</TeamContainer>
			)}
		</div>
	);
};

export default TeamPage;
