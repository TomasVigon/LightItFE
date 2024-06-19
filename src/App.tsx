import { useState } from 'react';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import Modal from './components/Modal/Modal';
import { User } from './interfaces/user';
import useLocalStorage from './hooks/useLocalStorage';
import instance from './clients/axios';
import { fileToBase64 } from './utils/file';
import './App.css';

const App = () => {
  const [users, setUsers] = useLocalStorage('users', []);
  const [modalOpen, setModalOpen] = useState(false);

  const addUser = async (user: User) => {
    const base64File = !!user.photo && await fileToBase64(user.photo);
    
    setUsers([...users, user]);
    
    //@ts-ignore
    instance.post('/patients', {...user, photo: !!user.photo ? base64File.base64 : null})
      .then((response) => {
        console.log('Reponse:', response.data);
        setModalOpen(true);
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} />
      <Modal isOpen={modalOpen} message={'User added successfully'} onClose={closeModal} />
    </div>
  );
};

export default App;
