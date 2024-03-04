import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css'; // Importa os estilos do arquivo CSS

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:5001/api/users/login', formData);
      console.log('Response:', response.data);
      // Set login success message
      setLoginMessage('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      // Set login error message
      setLoginMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.container}> {/* Adiciona a classe container */}
      <div className={styles.form}> {/* Adiciona a classe form */}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className={styles['message-container']}>
          {loginMessage && <div className={styles.message}>{loginMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
