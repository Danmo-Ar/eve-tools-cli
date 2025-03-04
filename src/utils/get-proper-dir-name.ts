export const getProperDirName = (projectName: string | undefined) => {
	return projectName === "." ? process.cwd().split("/").at(-1) : projectName;
};
