import { readFileSync } from "fs";

export const getEveCliVersion = () => {
	const pkg = readFileSync(
		new URL("../../package.json", import.meta.url),
		"utf-8",
	);
	return JSON.parse(pkg).version;
};
