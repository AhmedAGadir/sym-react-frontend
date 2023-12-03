// ** DATA UTIL METHODS **

export const getTeamId = (teamName) => {
	if (!teamName) return "";
	return teamName.match(/\bTeam (\w+)/)[1].toLowerCase();
};

// *copilot - capitalize each word, rest lowercase
export const formatTeamName = (str) => {
	if (!str) return "";
	// trim, lowercase each word and capitalise
	const teamName = str
		.trim()
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
		.join(" ");
	return `Team ${teamName}`;
};

export const memberNameFormatter = (firstName, lastName) =>
	`${firstName.toLowerCase()}-${lastName.toLowerCase()}`;

// ** GENERAL UTIL METHODS **

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

// * copilot
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const isNotEmptyString = (str) => str !== "";
