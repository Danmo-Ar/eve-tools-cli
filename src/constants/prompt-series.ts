import fs from "fs";
import { Question } from "inquirer";
import { DyanamicPrompt } from "../interfaces/index.js";
import { ARCHITECTURE, FRAMEWORK, LANGUAGE } from "./constants.js";
import { isValidProjectName } from "../utils/is-valid-project-name.js";

const { APPLICATION, WEBSITE, CRUD, DDD, MVC } = ARCHITECTURE;
const { ANGULAR, REACT, NEXT, NATIF, EXPRESS, NESTJS, SPRING, FLASK } =
	FRAMEWORK;
const { TS, JS, NODE, JAVA, PYTHON } = LANGUAGE;

const promptSeries: Record<
	number | string,
	Question | Record<string, Question>
> = {
	1: [
		{
			type: "input",

			name: "name",
			message: "Enter Your Project Name 📂 : ",

			// TODO : find a better way to do this :  default: { name: 'Current directory if nothing is written', value: '.' },
			default: ".",
			validate: (input: string) => {
				if (input !== "." && !isValidProjectName(input)) {
					return "Project name should be in lowercase and each word should be separate with '-' ";
				}

				const outDir = input === "." ? process.cwd() : input;
				// check if folder exist
				if (
					fs.existsSync(outDir) &&
					fs.readdirSync(outDir).length > 0
				) {
					return "The specified folder exist but is not empty";
				}

				return true;
			},
		},
		{
			type: "list",
			name: "type",
			message: "What type of project do you want to start 🏗 : ",

			choices: [{ name: "Frontend" }, "Backend"],
		},
	],
	2: {
		Frontend: [
			DynamicPromptArchitecture({
				choices: [
					{ name: "Application", value: APPLICATION },
					{ name: "Website", value: WEBSITE, disabled: true },
				],
			}),
		],
		Backend: [
			DynamicPromptArchitecture({
				choices: [
					{ name: "DDD", value: DDD, disabled: true },
					{ name: "MVC", value: MVC, disabled: true },
					{ name: "(CRUD SKELETON)", value: CRUD },
				],
			}),
		],
	},
	3: {
		Frontend: [
			DynamicPromptLanguage({
				choices: [TS, { name: JS, disabled: true }],
				defaultChoice: TS,
			}),
		],
		Backend: [
			DynamicPromptLanguage({
				choices: [
					NODE,
					{ name: JAVA, disabled: true },
					{ name: PYTHON, disabled: true },
				],
			}),
		],
	},
	4: {
		Frontend: [
			DynamicPromptFrameWork({
				choices: [
					NEXT,
					{ name: ANGULAR, disabled: true },
					{ name: REACT, disabled: true },
				],
				defaultChoice: NEXT,
			}),
		],
		node: [
			DynamicPromptFrameWork({
				choices: [
					{ name: NATIF, disabled: true },
					{ name: EXPRESS, disabled: true },

					NESTJS,
				],
				defaultChoice: NESTJS,
			}),
		],
		java: [
			DynamicPromptFrameWork({
				choices: [SPRING],
			}),
		],
		python: [
			DynamicPromptFrameWork({
				choices: [FLASK],
			}),
		],
	},
};

function DynamicPromptArchitecture({ choices, defaultChoice }: DyanamicPrompt) {
	return {
		type: "list",
		name: "architecture",
		message: "What kind of project do you want to start 🎛 : ",
		choices: choices,
		default: defaultChoice,
	};
}

function DynamicPromptLanguage({ choices, defaultChoice }: DyanamicPrompt) {
	return {
		type: "list",
		name: "language",
		message: "Choose a language 🪐 : ",
		choices: choices,
		default: defaultChoice,
	};
}

function DynamicPromptFrameWork({ choices, defaultChoice }: DyanamicPrompt) {
	return {
		type: "list",
		name: "framework",
		message: "Choose a framework to start 🛠 : ",
		choices: choices,
		default: defaultChoice,
	};
}

export default promptSeries;
