import { readFile } from "node:fs/promises";

import path from "path";
import { PkgJson } from "../../interfaces/index.js";
import { spinner } from "../../utils/spinner.js";
import { tryCatchWrapper } from "../../utils/try-catch-wrapper.js";

export const CheckPackageJson = async (cwd: string) => {
	let absolutePkgJsonPath = "";
	let pkgJson: PkgJson = {};
	const { start, succeed, fail } = spinner("Checking dependencies 🧐");

	await tryCatchWrapper(
		async () => {
			start();
			absolutePkgJsonPath = path.resolve(cwd, "package.json");

			const pkgData = await readFile(absolutePkgJsonPath, "utf-8");

			if (!pkgData) {
				fail("package.json not found 🤷‍♂️");
				throw new Error("package.json not found.");
			}

			pkgJson = JSON.parse(pkgData);

			// spinner.text = logger.custom("Checking Done." , "green");
			succeed("Checking Succeed 🎉");
		},
		() => {
			fail("Checking Failed 😞");
		},
	);

	return { absolutePkgJsonPath, pkgJson };
};
