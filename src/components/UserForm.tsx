import React, { useRef, useState } from 'react';
import DropBox, { DropBoxRef } from './DropBox';
import { User, UserErrors, UserFormData } from '../interfaces/user';
import { validateName, validateEmail, validatePhone, validatePhoto, validatePhotoSize } from '../utils/validations';

const UserForm: React.FC<{ addUser: (user: User) => void }> = ({ addUser }) => {
  const dropBoxRef = useRef<DropBoxRef>(null);

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    country: undefined,
    phone: undefined,
    photo: null,
  })
  
  const [errors, setErrors] = useState<UserErrors>({});

  const clearFileInput = () => {
    if (dropBoxRef.current) {
      const fileInput = dropBoxRef.current.getFileInput();
      if (fileInput) {
        fileInput.value='';
      }
    }
  };

  const handleDrop = (droppedFiles: FileList) => {
    const file = droppedFiles[0];
    handleFile(file);
  };

  const handleFile = (file: File | undefined) => {
    if (file && file.type === 'image/jpeg') {
      setFormData({ ...formData, photo: file });
      setErrors({ ...errors, photo: '' }); // Clear previous error
      
    } else {
      setFormData({ ...formData, photo: null });
      setErrors({ ...errors, photo: 'Only .jpg files are allowed' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: UserErrors = {};

    if (!validateName(formData.name)) newErrors.name = 'Name must be letters only';
    if (!validateEmail(formData.email)) newErrors.email = 'Email must be a valid @gmail.com address';
    if (!validatePhone(`${formData.country}`, `${formData.phone}`)) newErrors.phone = 'Invalid phone number';
    if (!validatePhoto(formData.photo)) newErrors.photo = 'This field is required';
    if (!validatePhotoSize(formData.photo)) newErrors.photo = 'File size should be smaller than 65KB';

    if (Object.keys(newErrors).length === 0) {
      const newData = {
        ...formData,
        phone: Number(`${formData.country}${formData.phone}`),
      };
      
      addUser(newData);
      setFormData({ name: '', email: '', country: undefined, phone: undefined, photo: null });
      setErrors({});
      clearFileInput();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Country Code</label>
        <input type="number" name="country" value={formData.country} onChange={handleChange} />
        <label>Phone Number</label>
        <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <div>
        <label>Document Photo</label>
        <DropBox ref={dropBoxRef} handleDrop={handleDrop} selectedFile={formData.photo} />
        {formData.photo && (
          <p>
            Selected file: {formData.photo.name} ({(formData.photo.size / 1024).toFixed(2)} KB)
          </p>
        )}
        {errors.photo && <span>{errors.photo}</span>}
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;