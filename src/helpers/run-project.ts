import { spawn } from "child_process";
import { PROJECT_SCRIPT } from "../constants/constants.js";
import { Project } from "../interfaces/index.js";
import { logger } from "../utils/index.js";

export const runProject = ({
	framework,
	path,
}: { framework: Project["framework"]; path: string }) => {
	const spawnProcess = spawn(PROJECT_SCRIPT[framework].start, {
		shell: true,
		cwd: path,
		stdio: "pipe",
		env: { ...process.env, FORCE_COLOR: "true" }, // Enable colors
	});

	spawnProcess.stdout.on("data", (data) => {
		writeStreamLine("stdout", data);
	});

	spawnProcess.stderr?.on("data", (data) => {
		writeStreamLine("stderr", data);
	});
};

function writeStreamLine(type: "stdout" | "stderr", data: Buffer) {
	const prefix = type === "stdout" ? "⏬ OUTPUT:" : logger.error("❌ ERROR:");
	process.stdout.write(`${prefix} ${data.toString().trim()}\n`);
}
