import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemberId, getTeamId } from "../utils";
import EditableContainer from "../components/EditableContainer";
import { AvatarPlaceHolderIcon } from "../components/Icons";
import { getMemberValidationErrors } from "../validation";

const MemberPage = ({ organization, updateTeams }) => {
	const { teamId, memberId } = useParams();
	const navigate = useNavigate();

	const team = useMemo(
		() =>
			organization?.teams.find((team) => getTeamId(team.teamName) === teamId) ??
			null,
		[organization, teamId]
	);

	const member = useMemo(
		() =>
			team?.members.find(
				(member) => getMemberId(member.firstName, member.lastName) === memberId
			) ?? null,
		[team, memberId]
	);

	const [editingMember, setEditingMember] = useState(null);

	const onEditingStarted = () => {
		const memberCopy = { ...member };
		setEditingMember(memberCopy);
	};

	const onEditingStopped = async (rollback) => {
		if (rollback) {
			setEditingMember(null);
			return { abortStopEditing: false, saveStatus: null };
		}

		const updatedTeams = organization.teams.map((team) => ({
			...team,
			members: team.members.map((member) => ({ ...member })),
		}));

		const teamInd = organization.teams.findIndex(
			(team) => getTeamId(team.teamName) === teamId
		);

		const memberInd = organization.teams[teamInd].members.findIndex(
			(member) => getMemberId(member.firstName, member.lastName) === memberId
		);

		updatedTeams[teamInd].members[memberInd] = editingMember;

		const validationErrors = getMemberValidationErrors(updatedTeams);

		if (validationErrors.length > 0) {
			return {
				abortStopEditing: true,
				saveStatus: { success: false, message: validationErrors },
			};
		}

		const { success, message } = await updateTeams(updatedTeams);

		if (!success) {
			return { abortStopEditing: true, saveStatus: { success, message } };
		}

		const updatedMemberId = getMemberId(
			editingMember.firstName,
			editingMember.lastName
		);
		if (updatedMemberId !== memberId) {
			navigate(`/team/${teamId}/member/${updatedMemberId}`);
		}

		setEditingMember(null);
		return { abortStopEditing: false, saveStatus: { success, message } };
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setEditingMember((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	if (!member) {
		return (
			<h1 className="text-3xl font-bold text-red-500">Member not found</h1>
		);
	}

	return (
		<EditableContainer
			onEditingStarted={onEditingStarted}
			onEditingStopped={onEditingStopped}
		>
			{({ editing, submitting }) => (
				<div className="flex flex-col gap-3">
					<AvatarPlaceHolderIcon />
					<div>
						<label
							htmlFor="firstName"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							First Name
						</label>

						<div className="mt-2">
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={editing ? editingMember?.firstName : member.firstName}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing || submitting}
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="lastName"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Last Name
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={editing ? editingMember?.lastName : member.lastName}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing || submitting}
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="email"
								id="email"
								value={editing ? editingMember?.email : member.email}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing || submitting}
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="startDate"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Start Date
						</label>
						<div className="mt-2">
							<input
								type="date"
								name="startDate"
								id="startDate"
								value={editing ? editingMember?.startDate : member.startDate}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing || submitting}
							/>
						</div>
					</div>
					<div>
						<div
							htmlFor="startDate"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Role
						</div>
						<div className="flex items-center mt-2 mb-4">
							<input
								disabled
								id="role-teamlead"
								type="radio"
								value="Team Lead"
								name="teamlead"
								checked={member.isTeamLead}
								className="cursor-not-allowed w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500"
							/>
							<label
								htmlFor="role-teamlead"
								className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
							>
								Team Lead
							</label>
						</div>
						<div className="flex items-center">
							<input
								disabled
								id="role-member"
								type="radio"
								value="Member"
								name="member"
								checked={!member.isTeamLead}
								className="cursor-not-allowed w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500"
							/>
							<label
								htmlFor="role-member"
								className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
							>
								Member
							</label>
						</div>
					</div>
				</div>
			)}
		</EditableContainer>
	);
};

export default MemberPage;
