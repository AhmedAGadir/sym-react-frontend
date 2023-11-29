export const teamNameFormatter = (str, lowerCase = true) => {
	const teamName = str.match(/\bTeam (\w+)/)[1];
	return lowerCase ? teamName.toLowerCase() : teamName;
};
