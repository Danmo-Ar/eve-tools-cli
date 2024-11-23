export interface Project {
	name: string;
	type: string;
	architecture: string;
	language: string;
	framework: "nestjs" | "nextjs";
}

export interface DyanamicPrompt {
	choices: Array<string | Record<string, string | boolean>>;
	defaultChoice?: string;
}

export type PkgJson = Record<string, string | boolean | number | undefined>;
