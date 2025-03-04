import inquirer from "inquirer";

export const wantToInstallDepsPrompt = async () => {
	const { wantToInstall } = await inquirer.prompt([
		{
			type: "confirm",
			name: "wantToInstall",
			message: "Do you want to install dependencies ?",
		},
	]);

	return { wantToInstall };
};
