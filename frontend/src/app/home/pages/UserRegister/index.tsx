import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegistrationForm.module.css'; // Importando estilos CSS


interface RegistrationFormData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir o comportamento padrão de enviar o formulário
    try {
      // Enviar os dados para o backend via Axios
      const response = await axios.post('http://localhost:5001/api/users/register', formData);
      console.log('Response:', response.data);
      // Definir a mensagem recebida do backend
      setRegistrationMessage(response.data.message);
    } catch (error: any) { // Convertendo para tipo 'any'
      console.error('Erro ao registrar usuário:', error);
      // Se houver um erro, definir a mensagem de erro correspondente
      setRegistrationMessage(error.response?.data.message || 'Erro desconhecido');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.CreateAccount}>Create an account</div>
      <div className={styles.alreadyHaveAccountContainer}>
        <p className={styles.alreadyHaveAccountText}>
          Already have an account?{' '}
          <a href="/login" className={styles.underline}>Login here</a>
        </p>
      </div>
      <div className={styles.fieldContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.inputLabel}>Name</label>
            <input type="text" id="name" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.inputLabel}>Username</label>
            <input type="text" id="username" name="username" placeholder="Nome de usuário" value={formData.username} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input type="password" id="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className={styles.input} />
          </div>
          <button type="submit" className={styles.button}>Sign in</button>
        </form>
        {registrationMessage && (
          <div className={styles.messageContainer}>
            <div className={styles.message}>{registrationMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
