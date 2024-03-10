import React, { useState } from 'react';
import axios from 'axios';
import styles from './DeleteForm.module.css'

interface DeleteFormData {
  email: string;
  password: string;
}

const DeleteUserForm: React.FC = () => {
  const [formData, setFormData] = useState<DeleteFormData>({
    email: '',
    password: ''
  });

  const [deleteMessage, setDeleteMessage] = useState('');

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
      const response = await axios.delete('http://localhost:5001/api/users/delete', {
        data: formData // Passando os dados de deleção no corpo da requisição
      });
      console.log('Response:', response.data);
      // Set delete success message
      setDeleteMessage('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Set delete error message
      setDeleteMessage('Error deleting user. Please try again.');
    }
  };

  return (
    <div className={styles.container} data-cy="delete-user-container">
      <div className={styles.UserDelete}><h2>Delete User</h2></div>
      <div className={styles.warningMessage}><h3>Are you sure you want to delete your user account?</h3></div>
      <div className={styles.fieldContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmEmail" className={styles.inputLabel}>Confirm Email:</label>
            <input 
              type="email" 
              id="confirmEmail" 
              name="email" 
              placeholder="Confirm Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className={styles.input}
              data-cy="confirm-email-input" // Adicionando data-cy para o campo de confirmação de email
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="password" 
              placeholder="Confirm Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className={styles.input}
              data-cy="confirm-password-input" // Adicionando data-cy para o campo de confirmação de senha
            />
            {/* Aqui está a div que contém a mensagem de exclusão */}
            <div className={styles.message} data-cy="delete-message">{deleteMessage}</div> {/* Adicionando data-cy para a mensagem de exclusão */}
          </div>
          <button type="submit" className={`${styles.button} ${styles.deleteButton}`} data-cy="delete-button">Delete</button> {/* Adicionando data-cy para o botão de exclusão */}
        </form>
      </div>
    </div>
  );
  
};

export default DeleteUserForm;
