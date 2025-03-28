/**
 * Uploads the file to pinata and retuns the path to it.
 * @param fileBuffer The image buffer.
 * @param fileName The name
 * @returns Path if the file in pinata.
 */
export async function uploadToPinata(fileBuffer: Buffer, fileName: string): Promise<string> {

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
};

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