import { consecutiveUniqueRandom } from 'unique-random';
/**
 * Generates a random six digits number
 */
export default function generateValidationCode(): number {
	const random = consecutiveUniqueRandom(100000, 999999);
	return random();
}