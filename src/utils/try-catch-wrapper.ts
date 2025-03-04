import { logger } from "./logger.js";

export const tryCatchWrapper = async (
	fn: () => Promise<void>,
	displayError?: () => void,
) => {
	try {
		await fn();
	} catch (err) {
		const error = err as Error;
		displayError?.();
		logger.error(`Error : ${error?.message}`);
		process.exit(1);
	}
};
