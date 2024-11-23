#!/usr/bin/env node

import figlet from "figlet";
import { logger } from "./utils/logger.js";

import { Command } from "commander";
import projectBuilder from "./helpers/project-builder.js";
import { generatePromptSeries } from "./prompts/index.js";
import { getEveCliVersion } from "./utils/index.js";

const program = new Command();
// version
const version = getEveCliVersion();

// Setup Cli info
program
	.name("eve")
	.usage("<command> [options]")
	.version(version)
	.description(
		"A CLI to generate a boilerplate project with the best practices",
	)
	.action(() => {
		program.outputHelp();
	});

/**
 * This the core of application it use the IIFE : to emcapsulate the launching
 */

// Display the figlet logo
logger.figlet(
	figlet.textSync("eve cli", {
		font: "ANSI Shadow",
	}),
);

// Remove all listeners to avoid warnings
process.removeAllListeners("warning");

program
	.command("init")
	.description("Initialize a new project")
	.action(async () => {
		const { projectMeta } = await generatePromptSeries();
		await projectBuilder(projectMeta);
	});

// launch the program
program.parse();
