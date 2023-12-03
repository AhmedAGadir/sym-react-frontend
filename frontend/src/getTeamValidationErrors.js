const getTeamValidationErrors = (teamData, otherTeamData) => {
	const validationErrors = [];

	if (!teamData.teamName) {
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
			!otherTeamData.some(
				(otherTeam) => otherTeam.teamName === `Team ${member.team}`
			)
	);

	if (membersLeftInTeam.length === 0) {
		validationErrors.push("Team must have at least one member");
	}
	const teamLeadCount = teamData.members.filter(
		(member) => member.isTeamLead
	).length;

	if (teamLeadCount === 0) {
		validationErrors.push("Team must have at a team lead");
	} else if (teamLeadCount > 1) {
		validationErrors.push("Team can only have one team lead");
	}

	return validationErrors;
};

export default getTeamValidationErrors;
