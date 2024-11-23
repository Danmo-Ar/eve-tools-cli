import type { Project } from "../interfaces/index.js";
import { initProcess } from "./commands/init.js";
import { clonningProcess } from "./github.js";

const projectBuilder = async (project: Project) => {
	const meta = project;

	await clonningProcess(meta);

	await initProcess(meta);
};

export default projectBuilder;
