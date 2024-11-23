import inquirer from "inquirer";

import { Project } from "../interfaces/index.js";
import prompt from "./prompt-en.js";

const initialPrompt: Project = {
	name: "",
	type: "",
	architecture: "",
	language: "",
	framework: "nextjs",
};

export const generatePrompts = async () => {
	const projectMeta: Project = { ...initialPrompt };
	let projectType = "";
	const languageMapToProjectType = new Set(["node", "python", "java"]); // In the prompts set the project type switch to (Frontend , Backend)

	for (const [, questionSet] of Object.entries(prompt)) {
		const questions = Array.isArray(questionSet)
			? questionSet
			: (questionSet as never)[projectType];

		const answers = await inquirer.prompt(questions);
		const { type, language } = answers;

		projectType = languageMapToProjectType.has(language)
			? language
			: projectType || type;

		Object.assign(projectMeta, answers);
	}

	return { projectMeta };
};
