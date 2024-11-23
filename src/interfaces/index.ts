export interface Project {
	name: string;
	type: string;
	architecture: string;
	language: string;
	framework: "nestjs" | "nextjs";
}
