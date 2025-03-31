import path from 'node:path';
import fs from "fs";
import { buffer } from 'node:stream/consumers';

/**
 * Saves the file
 * @param fileBuffer The image buffer.
 * @param fileName The name
 * @returns Path for the file
 */
export async function saveFile(fileBuffer: Buffer, fileName: string): Promise<string> {

	try {

		return saveToLocal(fileBuffer, fileName);

	} catch (error) {
		console.error('Error al salvar el fichero:', error);
		throw error;
	}

};

/**
 * 
 * @param filePath Path to the file.
 */
export async function readFile(filePath: string) {

};

/**
 * Deletes a file.
 * @param filePath Path to the file.
 */
export async function deleteFile(filePath: string) {

	try {
		const fullFilePath = path.join(__dirname, "..", filePath);
		if (fs.existsSync(fullFilePath)) {
			return fs.unlinkSync(fullFilePath);
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}


/**
 * Saves the to local 
 * @param fileBuffer The image buffer.
 * @param fileName The name
 * @returns Path for the file
 */
function saveToLocal(fileBuffer: Buffer, fileName: string): string {

	try {

		const relativePath = path.join("assets", "uploads");
		const fileDir = path.join(__dirname, "..", relativePath);

		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, { recursive: true });
		}

		const filePath = path.join(fileDir, fileName);

		fs.writeFileSync(filePath, fileBuffer);

		return path.join(relativePath, fileName);

	} catch (error) {
		console.error('Error al salvar el fichero a local:', error);
		throw error;
	}
}



/**
 * Saves the file
 * @param fileBuffer The image buffer.
 * @param fileName The name
 * @returns Path for the file
 */
async function saveToPinata(fileBuffer: Buffer, fileName: string): Promise<string> {

	try {

		const url: string = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
		const data: FormData = generateDataPackage(fileBuffer, fileName);

		console.log(data)
		const response = await fetch(url, {
			method: 'POST',
			body: data,
			headers: {
				'pinata_api_key': process.env.PINATA_API_KEY,
				'pinata_secret_api_key': process.env.PINATA_API_SECRET
			}
		});

		if (!response.ok) {
			throw new Error(`Error al subir el archivo: ${response.statusText}`);
		}

		const responseData = await response.json();
		console.log(responseData);
		return responseData.IpfsHash;

	} catch (error) {
		console.error('Error al subir el archivo a Pinata:', error);
		throw error;
	}
}

/**
 * Generates the package to upload to pinata.
 * @param fileBuffer Buffer of the file.
 * @param fileName Name of the file.
 * @returns A form with all the metadata.
 */
function generateDataPackage(fileBuffer: Buffer, fileName: string): FormData {

	const data: FormData = new FormData();
	const blob: Blob = new Blob([fileBuffer]);

	const metadata: string = JSON.stringify({
		name: fileName,
		date: Date.now()
	});

	const options = JSON.stringify({
		cidVersion: 0,
	});

	data.append('file', blob, fileName);
	data.append('pinataMetadata', metadata);
	data.append('pinataOptions', options);

	return data;

}