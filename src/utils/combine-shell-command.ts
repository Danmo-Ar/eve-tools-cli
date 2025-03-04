export const combineShellCommand = (...commands: string[]) => {
	const joinText = " && ";

	return commands.join(joinText);
};
