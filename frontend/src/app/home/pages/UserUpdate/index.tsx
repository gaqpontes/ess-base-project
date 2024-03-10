import React, { useState } from 'react';
import axios from 'axios';
import styles from './UserUpdateform.module.css';

interface UpdateFormData {
  oldEmail: string;
  newName: string;
  newEmail: string;
  newPassword: string;
  newUserName: string;
}

const UpdateForm: React.FC = () => {
  const [formData, setFormData] = useState<UpdateFormData>({
    oldEmail: '',
    newName: '',
    newEmail: '',
    newPassword: '',
    newUserName: ''
  });

  const [updateMessage, setUpdateMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:5001/api/users/update', formData);
      console.log('Response:', response.data);
      // Set update success message
      setUpdateMessage('Update successful!');
    } catch (error) {
      console.error('Error updating user:', error);
      // Set update error message
      setUpdateMessage('Error updating user. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.UpdateUser}>
        <h2>Update User Data</h2>
      </div>
      <div className={styles.EnterYourInfo}>
        <h5>Enter your email below to login to your account</h5>
      </div>
      <div className={styles.fieldContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="oldEmail" className={styles.inputLabel}>Old Email:</label>
            <input 
              type="email" 
              id="oldEmail" 
              name="oldEmail" 
              placeholder="Old Email" 
              value={formData.oldEmail} 
              onChange={handleChange} 
              required 
              className={styles.input}
              data-cy="input-oldEmail" // Adicionando data-cy para o campo de email antigo
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="newName" className={styles.inputLabel}>New Name:</label>
            <input 
              type="text" 
              id="newName" 
              name="newName" 
              placeholder="New Name" 
              value={formData.newName} 
              onChange={handleChange} 
              className={styles.input}
              data-cy="input-newName" // Adicionando data-cy para o campo de novo nome
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="newEmail" className={styles.inputLabel}>New Email:</label>
            <input 
              type="email" 
              id="newEmail" 
              name="newEmail" 
              placeholder="New Email" 
              value={formData.newEmail} 
              onChange={handleChange} 
              className={styles.input}
              data-cy="input-newEmail" // Adicionando data-cy para o campo de novo email
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="newPassword" className={styles.inputLabel}>New Password:</label>
            <input 
              type="password" 
              id="newPassword" 
              name="newPassword" 
              placeholder="New Password" 
              value={formData.newPassword} 
              onChange={handleChange} 
              className={styles.input}
              data-cy="input-newPassword" // Adicionando data-cy para o campo de nova senha
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="newUserName" className={styles.inputLabel}>New Username:</label>
            <input 
              type="text" 
              id="newUserName" 
              name="newUserName" 
              placeholder="New Username" 
              value={formData.newUserName} 
              onChange={handleChange} 
              className={styles.input}
              data-cy="input-newUserName" // Adicionando data-cy para o campo de novo nome de usuário
            />
            {/* Aqui está a div que contém a mensagem de atualização */}
            <div className={styles.messsage} data-cy="update-message">{updateMessage}</div> {/* Adicionando data-cy para a mensagem de atualização */}
          </div>
          <button type="submit" className={`${styles.button} ${styles.updateButton}`} data-cy="update-button">Update</button> {/* Adicionando data-cy para o botão de atualização */}
        </form>
      </div>
    </div>
  );  
};

export default UpdateForm;
