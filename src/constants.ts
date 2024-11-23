import { Project } from "./interfaces";

export enum ARCHITECTURE {
	APPLICATION = "application",
	WEBSITE = "website",
	DDD = "ddd",
	MVC = "mvc",
	CRUD = "crud",
}

export enum FRAMEWORK {
	ANGULAR = "angular",
	REACT = "react",
	NEXT = "nextjs",
	NATIF = "natif",
	EXPRESS = "express",
	NESTJS = "nestjs",
	SPRING = "spring",
	FLASK = "flask",
}

export enum LANGUAGE {
	TS = "ts",
	JS = "js",
	NODE = "node",
	JAVA = "java",
	PYTHON = "python",
}

export const PROJECT_SCRIPT: Record<
	Project["framework"],
	{ start: string; build: string }
> = {
	nextjs: {
		start: "npm run dev",
		build: "npm run build",
	},
	nestjs: {
		start: "npm run start:dev",
		build: "npm run build",
	},
};
