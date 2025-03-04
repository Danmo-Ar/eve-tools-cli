import { PROJECT_SCRIPT } from "../../constants/constants.js";
import { Project } from "../../interfaces/index.js";
import {
	execAsync,
	getAbsolutePath,
	getProperDirName,
	printTextIntoBox,
	tryCatchWrapper,
} from "../../utils/index.js";
import { spinner } from "../../utils/spinner.js";
import {
	CheckPackageJson,
	updatePackageJson,
} from "../manage-package-json/index.js";

import {
	wantToInstallDepsPrompt,
	wantToRunProjectPrompt,
} from "../../prompts/index.js";
import { runProject } from "../run-project.js";

export const initProcess = async ({
	name: projectName,
	...otherMeta
}: Project) => {
	// Get the absolute path of the current working directory
	const absolutePath = getAbsolutePath(projectName);

	// Ask the user if he wants to install the dependencies
	const { wantToInstall } = await wantToInstallDepsPrompt();

	if (!wantToInstall) return; // If the user doesn't want to install the dependencies, return

	const { pkgJson, absolutePkgJsonPath } =
		await CheckPackageJson(absolutePath); // Check the package.json file
	await updatePackageJson({
		// Update the package.json file
		pkgJson,
		absolutePkgJsonPath,
		projectName: getProperDirName(projectName),
	});

	await installDependencies(absolutePath, otherMeta); // Install the dependencies
};

const installDependencies = async (
	path: string,
	otherMeta: Omit<Project, "name">,
) => {
	const framework = otherMeta.framework;
	const { start, fail, succeed } = spinner("Installing dependencies 🚀");

	await tryCatchWrapper(
		async () => {
			start();
			await execAsync("npm install", { cwd: path });
			succeed("Done.");
			printTextIntoBox([
				"Dependencies installed successfully 👌\nHappy coding 🚀\n\n",
				`🤖 Start : ${PROJECT_SCRIPT[framework]?.start}\n`,
				`🔧 Build : ${PROJECT_SCRIPT[framework]?.build}`,
			]);

			// Ask the user if he wants to run the project
			const { wantToRunProject } = await wantToRunProjectPrompt();

			if (!wantToRunProject) return; // If the user doesn't want to run the project, return

			runProject({ framework, path });
		},
		() => {
			fail("Failed to install dependencies");
			return;
		},
	);
};
