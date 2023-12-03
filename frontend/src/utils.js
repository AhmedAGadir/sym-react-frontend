// ** DATA UTIL METHODS **

export const teamNameFormatter = (str, lowerCase = true) => {
	const teamName = str.match(/\bTeam (\w+)/)[1];
	return lowerCase ? teamName.toLowerCase() : teamName;
};

// *copilot - capitalize each word, rest lowercase
export const formatTeamNameFromInput = (str) => {
	const teamName = str
		.match(/\b(\w+)/g)
		.map(capitalize)
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
