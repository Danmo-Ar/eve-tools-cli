import { FRAMEWORK, LANGUAGE } from "../constants/constants.js";
import type { Project } from "../interfaces/index.js";
import { execAsync } from "../utils/promisified.js";
import { spinner } from "../utils/spinner.js";
import { tryCatchWrapper } from "../utils/try-catch-wrapper.js";

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
			succeed("Project clonned successfully 😄");
		},
		() => {
			fail("Project clonning failed 😞");
		},
	);
};
