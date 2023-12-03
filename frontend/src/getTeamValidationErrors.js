// good to extract this code so it can be tested
const getTeamValidationErrors = (teamData) => {
	const validationErrors = [];

	const uniqueTeamNames = new Set(teamData.map((team) => team.teamName));

	if (uniqueTeamNames.size < teamData.length) {
		validationErrors.push("Team name already exists");
	}

	const emptyTeams = teamData.filter((team) => team.members.length === 0);

	if (emptyTeams.length > 0) {
		validationErrors.push("Teams must have at least one member");
	}

	const teamsWithNoTeamLead = teamData.filter(
		(team) => !team.members.some((member) => member.isTeamLead)
	);

	if (teamsWithNoTeamLead.length > 0) {
		validationErrors.push("Teams must have a team lead");
	}

	const teamsWithMultipleTeamLeads = teamData.filter(
		(team) => team.members.filter((member) => member.isTeamLead).length > 1
	);

	if (teamsWithMultipleTeamLeads.length > 0) {
		validationErrors.push("Teams can only have one team lead");
	}

	return validationErrors;
};

export default getTeamValidationErrors;
