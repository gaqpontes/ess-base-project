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
    <div className={styles.container}>
        <div className={styles.LoginText}>
          <h2>Login</h2>
        </div>
        <div className={styles.EnterEmailAndPassword}>
          <h5>Enter your email below to login to your account</h5>
        </div>
        <div className={styles.fieldContainer}>
          <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input type="password" id="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className={styles.input} />
            {/* Move o message-container para dentro da inputContainer */}
            <div className={styles.message}>
              {loginMessage && <div>{loginMessage}</div>}
            </div>
          </div>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Login</button>
          </form>
        </div>    
    </div>
);

};

export default LoginForm;
