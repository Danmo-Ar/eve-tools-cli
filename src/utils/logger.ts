/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import ora from "ora";

export const errorColor = chalk.bold.red;
export const pendingColor = chalk.bold.blue;
export const figletColor = chalk.bold.cyanBright;

export const logger = {
	info(text: string) {
		console.log(chalk.bold.blue(text));
	},

	default(text: string) {
		return console.log(text);
	},

	success(text: string) {
		return console.log(chalk.bold.green(text));
	},

	error(text: string) {
		return console.log(chalk.bold.red(text));
	},

	pending(text: string) {
		console.log(chalk.bold.blue(text));
	},

	warning(text: string) {
		console.log(chalk.bold.yellow(text));
	},

	custom(text: string, color: keyof typeof chalk) {
		return (chalk.bold as any)[color](text);
	},
	figlet(text: string) {
		console.log(chalk.bold.cyanBright(text));
	},
	ora(text: string) {
		return {
			pending: ora(chalk.bold.blue(text)),
			fail: ora(chalk.bold.red(text)),
			succeed: ora(chalk.bold.green(text)),
		};
	},
};
