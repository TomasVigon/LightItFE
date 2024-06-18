export const validateName = (name: string) => /^[A-Za-z ]+$/.test(name);
export const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@gmail.com$/.test(email);
export const validatePhone = (country: string, phone: string) => /^[0-9]+$/.test(country) && /^[0-9]+$/.test(phone);
export const validatePhoto = (photo: File | null) => !!photo;
export const validatePhotoSize = (photo: File | null) => !!photo && photo.size < 1024 * 65;