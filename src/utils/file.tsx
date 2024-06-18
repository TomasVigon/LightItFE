export const blobToString = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsText(blob);
    });
  }

export const fileToBlob = async (file: File) => 
  new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });

export const fileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			resolve({
				base64: (reader.result as string).split(',').pop(),
				name: file.name,
				type: file.type,
				size: file.size,
			});
		reader.onerror = (error) => reject(error);
	});
}
  
export const base64ToFile = (base64String: string, filename: string, mimeType: string): File => {
    // Convert the Base64 string to a ArrayBuffer
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Create a File object from Blob
    const file = new File([blob], filename, { type: mimeType });
    return file;
  }
  