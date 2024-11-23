import boxen, { Options } from "boxen";
import { exec } from "node:child_process";

import { readFileSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path, { normalize } from "node:path";
import { promisify } from "node:util";
import ora from "ora";
import { errorColor, pendingColor } from "../lib/chalk-utility.js";

export type PkgJson = Record<string, string | boolean | number | undefined>;
export const execAsync = promisify(exec);

export const tryCatchWrapper = async (
	fn: () => Promise<void>,
	displayError?: () => void,
) => {
	try {
		await fn();
	} catch (error) {
		displayError?.();
		console.error(errorColor((error as Error)?.message));
		process.exit(1);
	}
};

export const CheckPackageJson = async (cwd: string) => {
	const spinner = ora(pendingColor("Checking dependencies..."));

	let absolutePkgJsonPath = "";
	let pkgJson: PkgJson = {};

	try {
		spinner.start();
		absolutePkgJsonPath = path.resolve(cwd, "package.json");

		const pkgData = await readFile(absolutePkgJsonPath, "utf-8");
		if (!pkgData) {
			spinner.fail("package.json not found.");
			throw new Error("package.json not found.");
		}

		pkgJson = JSON.parse(pkgData);

		spinner.text = "Checking Done.";
		spinner.succeed();
	} catch (err) {
		spinner.fail();
	}

	return { absolutePkgJsonPath, pkgJson };
};

export const updatePackageJson = async ({
	pkgJson,
	absolutePkgJsonPath,
	projectName,
}: {
	pkgJson: Record<string, string | boolean | number | undefined>;
	absolutePkgJsonPath: string;
	projectName?: string;
}) => {
	pkgJson.name = dirName(projectName);

	writeFileSync(absolutePkgJsonPath, JSON.stringify(pkgJson, null, 4));
};

export const dirName = (projectName: string | undefined) => {
	return projectName === "." ? process.cwd().split("/").at(-1) : projectName;
};

export const getAbsolutePath = (projectName: string) => {
	return normalize(
		projectName === "." ? process.cwd() : `${process.cwd()}/${projectName}`,
	);
};

export const getVersion = () => {
	const pkg = readFileSync(
		new URL("../../package.json", import.meta.url),
		"utf-8",
	);
	return JSON.parse(pkg).version;
};

export const printBoxText = (text: string, options?: Options) => {
	console.log(
		boxen(text, {
			padding: 1,
			width: 60,
			borderStyle: "round",
			dimBorder: true,
			...options,
		}),
	);
};
