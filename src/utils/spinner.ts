import chalk from "chalk";
import ora from "ora";

// This function adds a margin to the left of the text
const addMarginLeft = (text: string) => ` ${text}`;

/**
 * This function creates a spinner on top of ora packages to give a level of abstraction
 * @param text
 * @returns
 */

export const spinner = (text: string) => {
	const spinner = ora(chalk.bold.blue(addMarginLeft(text)));

	const start = () => spinner.start();

	const succeed = (onSuccessMessage: string) => {
		spinner.succeed(chalk.bold.green(addMarginLeft(onSuccessMessage)));
	};

	const swapText = (newText: string) =>
		(spinner.text = addMarginLeft(newText));

	const fail = (onFailMessage: string) => {
		spinner.fail(chalk.bold.red(addMarginLeft(onFailMessage)));
	};

	return { start, succeed, fail, swapText };
};
