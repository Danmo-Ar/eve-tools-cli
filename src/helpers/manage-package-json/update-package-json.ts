import { writeFileSync } from "fs";
import { getProperDirName } from "../../utils/index.js";

export const updatePackageJson = async ({
	pkgJson,
	absolutePkgJsonPath,
	projectName,
}: {
	pkgJson: Record<string, string | boolean | number | undefined>;
	absolutePkgJsonPath: string;
	projectName?: string;
}) => {
	pkgJson.name = getProperDirName(projectName);
	writeFileSync(absolutePkgJsonPath, JSON.stringify(pkgJson, null, 4));
};
