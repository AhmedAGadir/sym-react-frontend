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

export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
