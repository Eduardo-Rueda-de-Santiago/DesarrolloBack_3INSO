/**
 * Generates a random six digits number
 */
export function generateRandomNumber(): number {
	return Math.floor(100000 + Math.random() * 899999);
}
