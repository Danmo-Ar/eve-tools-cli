import inquirer from "inquirer";

export const wantToRunProjectPrompt = async () => {
	const { wantToRunProject } = await inquirer.prompt([
		{
			type: "confirm",
			name: "wantToRunProject",
			message: "Do you want to run the project ?",
		},
	]);

	return { wantToRunProject };
};
