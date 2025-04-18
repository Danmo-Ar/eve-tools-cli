#!/usr/bin/env node

import figlet from 'figlet';
import { logger } from './utils/logger.js';

import { Command } from 'commander';
import { checkAndUpdateCli, upgradeCli } from './helpers/commands/upgrade.js'; // Import upgrade functions
import projectBuilder from './helpers/project-builder.js';
import { generatePromptSeries } from './prompts/index.js';
import { getEveCliVersion } from './utils/index.js';

const program = new Command();
// version
const version = getEveCliVersion();

// Check for updates on startup (optional, can be removed if only explicit upgrade is desired)

// Setup Cli info
program
   .name('eve')
   .usage('<command> [options]')
   .version(version)
   .description(
      'A CLI to generate a boilerplate project with the best practices'
   )
   .action(() => {
      program.outputHelp();
   });

// Display the figlet logo
logger.figlet(
   figlet.textSync('eve cli', {
      font: 'ANSI Shadow',
   })
);
await checkAndUpdateCli().catch((err) => logger.error('Update check failed'));

// Remove all listeners to avoid warnings
process.removeAllListeners('warning');

// init command
program
   .command('init')
   .description('Initialize a new project')
   .action(async () => {
      const { projectMeta } = await generatePromptSeries();
      await projectBuilder(projectMeta);
   });

// Add the upgrade command
program
   .command('upgrade')
   .description('Upgrade Eve CLI to the latest version')
   .action(async () => {
      await upgradeCli();
   });

// launch the program
program.parse();
