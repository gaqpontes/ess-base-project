import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Update User Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Email:</label>
          <input type="email" name="oldEmail" value={formData.oldEmail} onChange={handleChange} required />
        </div>
        <div>
          <label>New Name:</label>
          <input type="text" name="newName" value={formData.newName} onChange={handleChange} />
        </div>
        <div>
          <label>New Email:</label>
          <input type="email" name="newEmail" value={formData.newEmail} onChange={handleChange} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
        </div>
        <div>
          <label>New Username:</label>
          <input type="text" name="newUserName" value={formData.newUserName} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
      <div>{updateMessage}</div>
    </div>
  );
};

export default UpdateForm;
