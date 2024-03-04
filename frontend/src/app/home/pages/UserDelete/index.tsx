import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Delete</button>
      </form>
      <div>{deleteMessage}</div>
    </div>
  );
};

export default DeleteUserForm;
