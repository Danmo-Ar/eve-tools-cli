import boxen, { Options } from "boxen";

import { logger } from "./logger.js";

export const printTextIntoBox = (text: string[], options?: Options) => {
	logger.default(
		boxen(text.join(""), {
			padding: 1,
			width: 60,
			borderStyle: "round",
			dimBorder: true,
			...options,
		}),
	);
};
