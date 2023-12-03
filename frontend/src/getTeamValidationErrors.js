const getTeamValidationErrors = (teamData) => {
	const validationErrors = [];

	const uniqueTeamNames = new Set(teamData.map((team) => team.teamName));

	if (uniqueTeamNames.size < teamData.length) {
		validationErrors.push("A team with this name already exists");
	}

	const emptyTeams = teamData.filter((team) => team.members.length === 0);

	if (emptyTeams.length > 0) {
		validationErrors.push("Each team must have at least one member");
	}

	const teamsWithNoTeamLead = teamData.filter(
		(team) => !team.members.some((member) => member.isTeamLead)
	);

	if (teamsWithNoTeamLead.length > 0) {
		validationErrors.push("Each team must have a designated Team Lead");
	}

	const teamsWithMultipleTeamLeads = teamData.filter(
		(team) => team.members.filter((member) => member.isTeamLead).length > 1
	);

	if (teamsWithMultipleTeamLeads.length > 0) {
		validationErrors.push(
			"Designated Team Leads cannot be transfered to other teams"
		);
	}

	return validationErrors;
};

export default getTeamValidationErrors;
