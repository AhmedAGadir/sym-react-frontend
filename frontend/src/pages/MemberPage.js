import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemberId, getTeamId } from "../utils";
import EditableContainer from "../components/EditableContainer";
import { AvatarPlaceHolderIcon } from "../components/Icons";
import { getMemberValidationErrors } from "../validation";
import { Input } from "../components/Input";
import { alertType } from "../components/Alert";

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
	const [isDirty, setIsDirty] = useState(false);

	const onEditingStarted = () => {
		const memberCopy = { ...member };
		setEditingMember(memberCopy);
	};

	const onEditingStopped = async (rollback) => {
		if (rollback || !isDirty) {
			setEditingMember(null);
			setIsDirty(false);
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
				saveStatus: { status: alertType.WARNING, message: validationErrors },
			};
		}

		const { success, message } = await updateTeams(updatedTeams);

		if (!success) {
			return {
				abortStopEditing: true,
				saveStatus: { status: alertType.DANGER, message },
			};
		}

		const updatedMemberId = getMemberId(
			editingMember.firstName,
			editingMember.lastName
		);
		if (updatedMemberId !== memberId) {
			navigate(`/team/${teamId}/member/${updatedMemberId}`);
		}

		setEditingMember(null);
		return {
			abortStopEditing: false,
			saveStatus: { status: alertType.SUCCESS, message },
		};
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setEditingMember((prevState) => ({
			...prevState,
			[name]: value,
		}));
		setIsDirty(true);
	};

	if (!member) {
		return (
			<h1 className="text-3xl font-bold text-red-500">Member not found</h1>
		);
	}

	return (
		<EditableContainer
			editLabel="Edit Member"
			onEditingStarted={onEditingStarted}
			onEditingStopped={onEditingStopped}
		>
			{({ editing, submitting }) => (
				<div className="flex flex-col gap-3">
					<AvatarPlaceHolderIcon />
					<div>
						<Input
							id="firstName"
							label="First Name"
							value={editing ? editingMember?.firstName : member.firstName}
							onChange={onInputChange}
							disabled={!editing || submitting}
							required
							className="w-full"
						/>
					</div>
					<div>
						<Input
							id="lastName"
							label="Last Name"
							value={editing ? editingMember?.lastName : member.lastName}
							onChange={onInputChange}
							disabled={!editing || submitting}
							required
							className="w-full"
						/>
					</div>
					<div>
						<Input
							id="email"
							label="Email"
							value={editing ? editingMember?.email : member.email}
							onChange={onInputChange}
							disabled={!editing || submitting}
							required
							className="w-full"
						/>
					</div>
					<div>
						<Input
							type="date"
							id="startDate"
							label="Start Date"
							value={editing ? editingMember?.startDate : member.startDate}
							onChange={onInputChange}
							disabled={!editing || submitting}
							required
							className="w-full"
						/>
					</div>
					<div>
						<div className="block text-sm font-medium leading-6 text-gray-900">
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
