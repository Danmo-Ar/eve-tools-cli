import chalk from 'chalk';
import { exec } from 'child_process';
import ora from 'ora';
import semver from 'semver';
import { promisify } from 'util';
import {
   getEveCliVersion,
   logger,
   printTextIntoBox,
} from '../../utils/index.js';

const execAsync = promisify(exec);

const PACKAGE_NAME = '@eve-tools/cli';

async function getLatestVersion(isSilent?: boolean): Promise<string> {
   const spinner = isSilent
      ? undefined
      : ora(`Fetching latest version for ${PACKAGE_NAME}...`).start();
   try {
      const { stdout } = await execAsync(`npm view ${PACKAGE_NAME} version`);
      spinner?.succeed(`Fetched latest version for ${PACKAGE_NAME}`);
      return stdout.trim();
   } catch (error) {
      spinner?.fail(`Failed to fetch latest version for ${PACKAGE_NAME}`);
      logger.error('Error fetching latest version:');
      process.exit(1);
   }
}
export async function checkAndUpdateCli(
   isSilent: boolean = true
): Promise<void> {
   const currentVersion = getEveCliVersion();
   const latestVersion = await getLatestVersion(isSilent);

   if (semver.lt(currentVersion, latestVersion)) {
      printTextIntoBox([
         chalk.yellow('Update available! '),
         chalk.dim(`(${currentVersion} -> ${latestVersion})\n`),
         chalk.gray('Run '),
         chalk.cyan(`eve upgrade or npm install -g ${PACKAGE_NAME}@latest`),
         chalk.gray(' to update.'),
      ]);
   } else {
      logger.success('Eve CLI is up to date.');
   }
}

export async function upgradeCli(): Promise<void> {
   const currentVersion = getEveCliVersion();
   const latestVersion = await getLatestVersion();

   if (semver.gte(currentVersion, latestVersion)) {
      logger.success(
         `You already have the latest version (${currentVersion}).`
      );
      return;
   }

   const spinner = ora(
      `Upgrading ${PACKAGE_NAME} from ${currentVersion} to ${latestVersion}...`
   ).start();
   try {
      await execAsync(`npm install -g ${PACKAGE_NAME}@latest`);
      spinner.succeed(
         `Successfully upgraded ${PACKAGE_NAME} to ${latestVersion}`
      );
      logger.info(
         "\nPlease restart your terminal or run 'rehash' (if using zsh) for changes to take effect."
      );
   } catch (error: any) {
      spinner.fail(`Failed to upgrade ${PACKAGE_NAME}`);
      logger.error(`Error during upgrade: ${error?.message}`);
      process.exit(1);
   }
}
