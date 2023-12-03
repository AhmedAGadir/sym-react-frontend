// ** DATA UTIL METHODS **

export const getTeamId = (teamName) => {
	if (!teamName) return "";
	return teamName.match(/\bTeam (\w+)/)[1].toLowerCase();
};

export const getMemberId = (firstName, lastName) =>
	`${firstName}-${lastName}`.toLowerCase();

// ** GENERAL UTIL METHODS **

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

// * copilot
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const isNotEmptyString = (str) => str !== "";
