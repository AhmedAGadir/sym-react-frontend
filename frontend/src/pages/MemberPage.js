import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMemberId, getTeamId } from "../utils";
import EditableContainer from "../components/EditableContainer";
import Loader from "../components/Loader";
import { AvatarPlaceHolderIcon } from "../components/Icons";
import Alert from "../components/Alert";
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

	const [editing, setEditing] = useState(false);
	const [editingMember, setEditingMember] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [saveStatus, setSaveStatus] = useState(null);

	const startEditing = () => {
		setSaveStatus(null);
		const memberCopy = { ...member };
		setEditingMember(memberCopy);
		setEditing(true);
	};

	const stopEditing = async (saveChanges) => {
		if (!saveChanges) {
			setSaveStatus(null);
			setEditingMember(null);
			setEditing(false);
			return;
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
			setSaveStatus({ success: false, message: validationErrors[0] });
			return;
		}

		setSubmitting(true);
		const { success, message } = await updateTeams(updatedTeams);

		setSaveStatus({ success, message });
		setSubmitting(false);

		if (!success) {
			return;
		}

		const updatedMemberId = getMemberId(
			editingMember.firstName,
			editingMember.lastName
		);
		if (updatedMemberId !== memberId) {
			navigate(`/team/${teamId}/member/${updatedMemberId}`);
		}

		setEditing(false);
		setEditingMember(null);
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setEditingMember((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		stopEditing(true);
	};

	const displayingMember = useMemo(
		() => (editing ? editingMember : member),
		[editing, editingMember, member]
	);

	if (!member) {
		return (
			<h1 className="text-3xl font-bold text-red-500">Member not found</h1>
		);
	}

	return (
		<EditableContainer editing={editing} onSubmit={onFormSubmit}>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="mt-2 flex justify-end">
					{!editing && (
						<button
							type="button"
							onClick={startEditing}
							className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
						>
							Edit Member
						</button>
					)}
					{editing && (
						<div className="flex gap-x-2">
							<button
								type="button"
								className="rounded-md bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								onClick={() => stopEditing(false)}
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={submitting}
								className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
							>
								{submitting ? <Loader /> : "Save"}
							</button>
						</div>
					)}
				</div>

				<div>
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
								value={displayingMember.firstName}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing}
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
								value={displayingMember.lastName}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing}
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
								value={displayingMember.email}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing}
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
								value={displayingMember.startDate}
								className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={onInputChange}
								disabled={!editing}
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
								checked={displayingMember.isTeamLead}
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
								checked={!displayingMember.isTeamLead}
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
			</div>
		</EditableContainer>
	);
};

export default MemberPage;
