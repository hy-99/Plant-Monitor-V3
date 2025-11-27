export const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [mimeTypePart, base64Data] = result.split(';base64,');
      const mimeType = mimeTypePart.split(':')[1];
      if (mimeType && base64Data) {
        resolve({ mimeType, data: base64Data });
      } else {
        reject(new Error("Invalid file format."));
      }
    };
    reader.onerror = (error) => reject(error);
  });