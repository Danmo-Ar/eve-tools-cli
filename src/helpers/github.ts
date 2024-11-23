import ora from "ora";
import { FRAMEWORK, LANGUAGE } from "../constants.js";
import type { Project } from "../interfaces/index.js";
import { tryCatchWrapper } from "../utils/try-catch-wrapper.js";
import { execAsync } from "./index.js";

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

const spinner = ora("Clonning the project");

export const clonningProcess = async (project: Project) => {
	await tryCatchWrapper(
		async () => {
			spinner.start();
			await execAsync(
				`git clone ${templateGithub.get(
					`${project.language}-${project.framework}`,
				)} ${project.name}`,
			);
			spinner.text = "Project clonned successfully";
			spinner.succeed();
		},
		() => {
			spinner.fail();
		},
	);
};
