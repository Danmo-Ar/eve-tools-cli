import { execSync } from "child_process";
import { FRAMEWORK, LANGUAGE } from "../constants/constants.js";
import type { Project } from "../interfaces/index.js";
import { getAbsolutePath } from "../utils/get-absolute-path.js";
import { execAsync } from "../utils/promisified.js";
import { spinner } from "../utils/spinner.js";
import { tryCatchWrapper } from "../utils/try-catch-wrapper.js";
import { combineShellCommand } from "../utils/combine-shell-command.js";

const { NESTJS, NEXT } = FRAMEWORK;
const { NODE, TS } = LANGUAGE;

const templateGithub = new Map()
	.set(
		`${NODE}-${NESTJS}`,
		"https://github.com/Akuma225/nestjs-prisma-mono-skeleton.git",
	)
	.set(
		`${TS}-${NEXT}`,
		"https://github.com/Danmo-Ar/nextjs-architecture.git",
	);

export const clonningProcess = async (project: Project) => {
	const { start, fail, succeed } = spinner("Clonning the project 🚀");
	await tryCatchWrapper(
		async () => {
			start();
			await execAsync(
				`git clone ${templateGithub.get(
					`${project.language}-${project.framework}`,
				)} ${project.name}`,
			);
			initGit(project.name);
			succeed("Project clonned successfully 😄");
		},
		() => {
			fail("Project clonning failed 😞");
		},
	);
};

const initGit = (path: string) => {
	const projectPath = getAbsolutePath(path);
	// Remove previous git

	execSync(
		combineShellCommand(
			"rm -rf .git",
			"git init",
			"git checkout -b main",
			"git add .",
			"git commit -m 'first initialisation' ",
		),
		{ cwd: projectPath },
	);
};
