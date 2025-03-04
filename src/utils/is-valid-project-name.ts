export const isValidProjectName = (projectName: string) => {
	const validProjectRegEx = /^[a-z]+(-[a-z]+)*$/;

	return projectName.match(validProjectRegEx);
};
