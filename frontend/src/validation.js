import { validateEmail } from "./utils";

export const getTeamValidationErrors = (teams) => {
	const validationErrors = [];

	const uniqueTeamNames = new Set(teams.map((team) => team.teamName));

	if (uniqueTeamNames.size < teams.length) {
		validationErrors.push("A team with this name already exists");
	}

	const emptyTeams = teams.filter((team) => team.members.length === 0);

	if (emptyTeams.length > 0) {
		validationErrors.push("Each team must have at least one member");
	}

	const teamsWithNoTeamLead = teams.filter(
		(team) => !team.members.some((member) => member.isTeamLead)
	);

	if (teamsWithNoTeamLead.length > 0) {
		validationErrors.push("Each team must have a designated Team Lead");
	}

	const teamsWithMultipleTeamLeads = teams.filter(
		(team) => team.members.filter((member) => member.isTeamLead).length > 1
	);

	if (teamsWithMultipleTeamLeads.length > 0) {
		validationErrors.push("Each team can have only one designated Team Lead");
	}

	return validationErrors;
};

export const getMemberValidationErrors = (teams) => {
	const validationErrors = [];

	const allTeamMembers = teams.map((team) => team.members).flat();

	allTeamMembers.forEach((member) => {
		if (!validateEmail(member.email)) {
			validationErrors.push("Please enter a valid email address");
		}
	});

	allTeamMembers.forEach((member) => {
		const startDate = new Date(member.startDate);
		if (isNaN(startDate.getTime())) {
			validationErrors.push("Please enter a valid start date");
		}
	});

	const uniqueEmails = new Set(allTeamMembers.map((member) => member.email));
	if (uniqueEmails.size < allTeamMembers.length) {
		validationErrors.push("A member with this email already exists");
	}

	return validationErrors;
};
