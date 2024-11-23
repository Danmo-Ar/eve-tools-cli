#!/usr/bin/env node

import figlet from "figlet";
import { logger } from "./utils/logger.js";

import { Command } from "commander";
import projectBuilder from "./helpers/builder.js";
import { getVersion } from "./helpers/index.js";
import { generatePrompts } from "./prompt/generate-prompts.js";
const program = new Command();
// version
const version = getVersion();

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
		const { projectMeta } = await generatePrompts();
		await projectBuilder(projectMeta);
	});

// launch the program
program.parse();
