#!/usr/bin/env node

import figlet from 'figlet';
import { logger } from './utils/logger.js';

import { Command } from 'commander';
import { ARCHITECTURE, FRAMEWORK, LANGUAGE } from './constants/constants.js'; // Import constants
import { checkAndUpdateCli, upgradeCli } from './helpers/commands/upgrade.js'; // Import upgrade functions
import projectBuilder from './helpers/project-builder.js';
import { Project } from './interfaces/index.js'; // Import Project interface
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
   .command('init [name]') // Add optional name argument
   .description('Initialize a new project')
   .option('-t, --type <type>', 'Project type (frontend/backend)')
   .option(
      '-a, --arch <architecture>',
      `Project architecture (${ARCHITECTURE.APPLICATION}/${ARCHITECTURE.CRUD})`
   )
   .option(
      '-l, --lang <language>',
      `Programming language (${LANGUAGE.TS}/${LANGUAGE.NODE})`
   )
   .option(
      '-f, --framework <framework>',
      `Project framework (${FRAMEWORK.NEXT}/${FRAMEWORK.NESTJS})`
   )
   .action(async (name, options) => {
      let projectMeta: Project;
      const useFlags =
         options.type ||
         options.arch ||
         options.lang ||
         options.framework ||
         (name && name !== '.');

      if (useFlags) {
         // Use flags to build projectMeta
         const projectName = name && name !== '.' ? name : '.'; // Use provided name or default to current dir
         const typeInput = options.type?.toLowerCase();
         const finalType =
            typeInput === 'backend' || typeInput === 'b'
               ? 'Backend'
               : 'Frontend'; // Default to Frontend

         let finalArch: string;
         let finalLang: string;
         let finalFramework: 'nestjs' | 'nextjs';

         // Set defaults and validate based on type
         if (finalType === 'Frontend') {
            finalArch = options.arch || ARCHITECTURE.APPLICATION;
            finalLang = options.lang || LANGUAGE.TS;
            finalFramework = options.framework || FRAMEWORK.NEXT;

            // Validate against allowed Frontend options
            if (
               finalArch !== ARCHITECTURE.APPLICATION ||
               finalLang !== LANGUAGE.TS ||
               finalFramework !== FRAMEWORK.NEXT
            ) {
               logger.error(
                  `Invalid combination for Frontend. Currently supported: --arch ${ARCHITECTURE.APPLICATION} --lang ${LANGUAGE.TS} --framework ${FRAMEWORK.NEXT}`
               );
               process.exit(1);
            }
         } else {
            // Backend
            finalArch = options.arch || ARCHITECTURE.CRUD;
            finalLang = options.lang || LANGUAGE.NODE;
            finalFramework = options.framework || FRAMEWORK.NESTJS;

            // Validate against allowed Backend options
            if (
               finalArch !== ARCHITECTURE.CRUD ||
               finalLang !== LANGUAGE.NODE ||
               finalFramework !== FRAMEWORK.NESTJS
            ) {
               logger.error(
                  `Invalid combination for Backend. Currently supported: --arch ${ARCHITECTURE.CRUD} --lang ${LANGUAGE.NODE} --framework ${FRAMEWORK.NESTJS}`
               );
               process.exit(1);
            }
         }

         projectMeta = {
            name: projectName,
            type: finalType,
            architecture: finalArch,
            language: finalLang,
            framework: finalFramework,
         };

         logger.info(`Initializing project '${projectName}' with flags:`);
         logger.info(`  Type: ${projectMeta.type}`);
         logger.info(`  Architecture: ${projectMeta.architecture}`);
         logger.info(`  Language: ${projectMeta.language}`);
         logger.info(`  Framework: ${projectMeta.framework}`);
      } else {
         // No flags provided, use interactive prompts
         logger.info('Starting interactive initialization...');
         const result = await generatePromptSeries();
         projectMeta = result.projectMeta;
         // If name argument was provided (e.g., 'eve init my-app'), override the prompted name
         if (name && name !== '.') {
            projectMeta.name = name;
         }
      }

      await projectBuilder(projectMeta);
   });

// Add the upgrade command
program
   .command('upgrade')
   .description('Upgrade Eve CLI to the latest version')
   .action(async () => {
      await upgradeCli();
   });

// Add the check-update command
program
   .command('check-update')
   .description('Check for updates to the Eve CLI')
   .action(async () => {
      await checkAndUpdateCli();
   });

// launch the program
program.parse();
