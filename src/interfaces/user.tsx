export interface User {
  name: string;
  photo: File | null;
  email: string;
  phone?: number;
}

export interface UserFormData extends User {
  country?: number;
}

export interface UserErrors {
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  country?: string;
}

export interface PatientsResponse {
  email: string;
  id: number;
  name: string;
  phone: number;
  photo: string;
}
