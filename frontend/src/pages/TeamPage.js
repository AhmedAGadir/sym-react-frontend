import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Dropdown from "../components/Dropdown";
import { InputWithAddOn } from "../components/Input";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { ExclamationTriangleIcon } from "../components/Icons";
import EditableContainer from "../components/EditableContainer";

import { getTeamValidationErrors } from "../validation";
import { capitalize, classNames, getMemberId, getTeamId } from "../utils";
import { ROLES } from "../constants";
import BackButton from "../components/BackButton";

const TeamPage = ({ organization, updateTeams }) => {
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
	const [editMade, setEditMade] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const startEditing = () => {
		setSaveStatus(null);

		const membersCopy = members.map((member) => ({ ...member }));
		setEditingTeamName(capitalize(teamId));
		setEditingMembers(membersCopy);
		setEditing(true);
	};

	const stopEditing = async (saveChanges) => {
		if (!saveChanges || !editMade) {
			setSaveStatus(null);
			setEditing(false);
			setEditingTeamName("");
			setEditingMembers([]);
			setEditMade(false);
			return;
		}

		const updatedTeams = organization.teams.map((team) => ({
			...team,
			members: team.members.map((member) => ({ ...member })),
		}));

		const teamInd = organization.teams.findIndex(
			(team) => getTeamId(team.teamName) === teamId
		);

		// update team name
		const updatedTeamName = `Team ${editingTeamName
			.trim()
			.match(/\b(\w+)/g)
			.map(capitalize)
			.join(" ")}`;

		updatedTeams[teamInd].teamName = updatedTeamName;

		// update team members
		const updatedTeamMembers = [];

		editingMembers.forEach(
			({ team: editingMembersTeam, ...restOfEditingMember }) => {
				if (getTeamId(editingMembersTeam) === teamId) {
					// remove 'team' property from member and keep in this team
					updatedTeamMembers.push(restOfEditingMember);
				} else {
					// move member to correct team
					const otherTeamInd = updatedTeams.findIndex(
						(otherTeam) =>
							getTeamId(otherTeam.teamName) === getTeamId(editingMembersTeam)
					);
					updatedTeams[otherTeamInd].members.push(restOfEditingMember);
				}
			}
		);

		updatedTeams[teamInd].members = updatedTeamMembers;

		// validate updated teams
		const validationErrors = getTeamValidationErrors(updatedTeams);

		if (validationErrors.length > 0) {
			setSaveStatus({ success: false, message: validationErrors });
			return;
		}

		setSubmitting(true);
		const { success, message } = await updateTeams(updatedTeams);

		setSaveStatus({ success, message });
		setSubmitting(false);

		if (!success) {
			return;
		}

		const updatedTeamId = getTeamId(updatedTeamName);
		if (updatedTeamId !== teamId) {
			navigate(`/team/${updatedTeamId}`);
		}

		setEditing(false);
		setEditingTeamName("");
		setEditingMembers([]);
		setEditMade(false);
	};

	const onTeamNameChanged = (e) => {
		setEditMade(true);

		setEditingTeamName(e.target.value);
	};

	const onEditingFieldChanged = (memberInd, field, newValue) => {
		setEditMade(true);

		const updatedEditingMembers = [...editingMembers];
		updatedEditingMembers[memberInd][field] = newValue;
		setEditingMembers(updatedEditingMembers);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		stopEditing(true);
	};

	const displayingMembers = useMemo(
		() => (editing ? editingMembers : members),
		[editing, editingMembers, members]
	);

	return (
		<div>
			{!team && (
				<h1 className="text-3xl font-bold text-red-500">Team not found</h1>
			)}
			{members.length > 0 && (
				<EditableContainer editing={editing} onSubmit={onFormSubmit}>
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto relative">
								<BackButton
									to="/"
									className="!absolute -left-12 lg:-left-20 -top-1"
								/>

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
											onChange={onTeamNameChanged}
											addOn="Team"
											required
											disabled={submitting}
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
											disabled={submitting}
										>
											{submitting ? <Loader /> : "Save"}
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
									{Array.isArray(saveStatus.message) ? (
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
									) : (
										<span>{saveStatus.message}</span>
									)}
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
												<th scope="col" className="sr-only">
													Warnings
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
													<td className="whitespace-nowrap py-5 text-sm text-gray-500 w-10">
														{member.isTeamLead &&
															getTeamId(member.team) !== teamId && (
																<div className="inline-block mt-3">
																	<div className="group relative">
																		<ExclamationTriangleIcon className="text-yellow-500" />
																		<div className="pointer-events-none absolute -top-16 left-0 w-56 whitespace-normal text-yellow-800 rounded-lg bg-yellow-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
																			Designated Team Leads cannot be transfered
																			to other teams
																		</div>
																	</div>
																</div>
															)}
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
																disabled={submitting}
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
																disabled={submitting}
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
																	: `/team/${teamId}/member/${getMemberId(
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
				</EditableContainer>
			)}
		</div>
	);
};

export default TeamPage;
