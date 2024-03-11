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
            <input
                data-cy="input-name"
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              {formData.name === "" && (
                <span data-cy="input-name-error" className={styles.formError}>
                  O nome é obrigatório
                </span>
              )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input
                data-cy="input-email"
                type="email"
                id="email"
                name="email"
                placeholder="Digite o email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              {formData.email === "" && (
                <span data-cy="input-email-error" className={styles.formError}>
                  O email é obrigatório
                </span>
              )}          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.inputLabel}>Username</label>
              <input
                data-cy="input-username"
                type="text"
                id="username"
                name="username"
                placeholder="Digite o nome de usuário"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
              />
              {formData.username === "" && (
                <span data-cy="input-username-error" className={styles.formError}>
                  O nome de usuário é obrigatório
                </span>
              )}          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
                        <input
                data-cy="input-password"
                type="password"
                id="password"
                name="password"
                placeholder="Digite a senha"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              {formData.password === "" && (
                <span data-cy="input-password-error" className={styles.formError}>
                  A senha é obrigatória
                </span>
              )}          </div>
          {registrationMessage && (
            <div>
              <div className={styles.messageContainer}>{registrationMessage}</div>
            </div>
          )}
            <button
              data-cy="submit-button"
              type="submit"
              className={styles.button}
            >
              Sign in
            </button>        </form>
      </div>
    </div>
  );  
};

export default RegistrationForm;
