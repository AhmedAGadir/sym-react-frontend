import { getTeamId } from "./utils";

// good to extract this code so it can be tested
const getTeamValidationErrors = (teamData, otherTeamData) => {
	const validationErrors = [];

	if (!teamData.teamName || !getTeamId(teamData.teamName)) {
		validationErrors.push("Team must have a name");
	}

	const teamNameExists = otherTeamData.some(
		(team) => team.teamName === teamData.teamName
	);

	if (teamNameExists) {
		validationErrors.push("Team name already exists");
	}

	const membersLeftInTeam = teamData.members.filter(
		(member) =>
			!otherTeamData.some((otherTeam) => otherTeam.teamName === member.team)
	);

	if (membersLeftInTeam.length === 0) {
		validationErrors.push("This team must have at least one member");
	}
	const teamLeadCount = membersLeftInTeam.filter(
		(member) => member.isTeamLead
	).length;

	if (teamLeadCount === 0) {
		validationErrors.push("This team must have a team lead");
	} else if (teamLeadCount > 1) {
		validationErrors.push("Teams can only have one team lead");
	}

	return validationErrors;
};

export default getTeamValidationErrors;
