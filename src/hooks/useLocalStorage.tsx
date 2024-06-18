import { useEffect, useState } from 'react';
import { PatientsResponse, User } from '../interfaces/user';
import { base64ToFile, fileToBase64 } from '../utils/file';
import instance from '../clients/axios';

const useLocalStorage = (key: string, initialValue: User[]): [User[], (value: User[]) => void] => {
  const [storedValue, setStoredValue] = useState<User[]>([]);

  
  const localStorageUsers = window.localStorage.getItem(key);
  const storedUsers = !!localStorageUsers && JSON.parse(localStorageUsers).map((user: User) => { 
    //@ts-ignore
    return({...user, photo: !!user.photo ? base64ToFile(user.photo.base64, user.photo.name || 'defaultFilename', user.photo.type || "image/jpeg") : null})
  });
  
  useEffect(() => {
		if (!localStorageUsers) {
      
      instance.get('/patients')
        .then((response: {data: PatientsResponse[]}) => {
          const newUsers = response.data.map((user) => {
            return({
              email: user.email,
              name: user.name,
              phone: user.phone,
              photo: !!user.photo ? base64ToFile(user.photo, 'defaultFilename', "image/jpeg") : null
            })
          });
          setStoredValue(newUsers)
        })
        .catch((error) => {console.error('Error fetching data:', error); setStoredValue(initialValue)});
		} else {
      setStoredValue(storedUsers);
    }
	}, []);

  const setValue = async (value: User[]) => {
    try {
        const parsedValue = await Promise.all(value.map(async (user) => { 
            return({...user, photo: !!user.photo ? await fileToBase64(user.photo) : null}) 
        }));
        
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(parsedValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;