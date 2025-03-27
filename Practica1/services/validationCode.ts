/**
 * Generates a random six digits number
 */
export default function generateValidationCode(): number {
	return Math.floor(100000 + Math.random() * 899999);
}