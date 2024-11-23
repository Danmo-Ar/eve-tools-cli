import { spawn } from "child_process";
import inquirer from "inquirer";
import ora from "ora";
import { PROJECT_SCRIPT } from "../../constants.js";
import { Project } from "../../interfaces/index.js";
import {
	CheckPackageJson,
	dirName,
	execAsync,
	getAbsolutePath,
	printBoxText,
	tryCatchWrapper,
	updatePackageJson,
} from "../index.js";

export const initProcess = async ({
	name: projectName,
	...otherMeta
}: Project) => {
	// Get the absolute path of the current working directory
	const absolutePath = getAbsolutePath(projectName);
	const { shouldInstall } = await inquirer.prompt([
		{
			type: "confirm",
			name: "shouldInstall",
			message: "Do you want to install dependencies ?",
		},
	]); // Ask the user if he wants to install the dependencies

	if (!shouldInstall) return; // If the user doesn't want to install the dependencies, return

	const { pkgJson, absolutePkgJsonPath } =
		await CheckPackageJson(absolutePath); // Check the package.json file
	await updatePackageJson({
		// Update the package.json file
		pkgJson,
		absolutePkgJsonPath,
		projectName: dirName(projectName),
	});

	await installDependencies(absolutePath, otherMeta); // Install the dependencies
};

const installDependencies = async (
	path: string,
	otherMeta: Omit<Project, "name">,
) => {
	const framework = otherMeta.framework;
	// TODO: Find the package manager used in the project
	const spinner = ora("Installing dependencies...");
	spinner.start();

	await tryCatchWrapper(
		async () => {
			await execAsync("pnpm install", { cwd: path });
			spinner.succeed("Done.");
			printBoxText(
				`Dependencies installed successfully 👌\nHappy coding 🚀\n\n🤖 Start : ${PROJECT_SCRIPT[framework]?.start}\n🔧 Build : ${PROJECT_SCRIPT[framework]?.build}`,
			);

			const { shouldRun } = await inquirer.prompt([
				// Ask the user if he wants to run the project
				{
					type: "confirm",
					name: "shouldRun",
					message: "Do you want to run the project ?",
				},
			]);

			if (!shouldRun) return; // If the user doesn't want to run the project, return

			runProjectAfterInit({ framework, path });
		},
		() => {
			spinner.fail("Failed to install dependencies");
			return;
		},
	);
};

export const runProjectAfterInit = ({
	framework,
	path,
}: { framework: Project["framework"]; path: string }) => {
	const spawnProcess = spawn(PROJECT_SCRIPT[framework].start, {
		shell: true,
		cwd: path,
		stdio: "pipe",
		env: { ...process.env, FORCE_COLOR: "true" }, // Enable colors
	});

	// For now stop the execution if framework is not next
	if (framework !== "nextjs") return;

	spawnProcess.stdout.on("data", (data) => {
		writeSameLine("stdout", data);
	});

	spawnProcess.stderr?.on("data", (data) => {
		writeSameLine("stderr", data);
	});
};

function writeSameLine(type: "stdout" | "stderr", data: Buffer) {
	// Format the output
	const prefix = type === "stdout" ? "🌟 OUTPUT:" : "❌ ERROR:";
	const newLine = `${prefix} ${data.toString().trim()}\n`;
	process.stdout.write(newLine);
}
