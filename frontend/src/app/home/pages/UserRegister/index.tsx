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

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
      // Definir o estado para indicar o registro bem-sucedido
      setRegistrationSuccess(true);
      // Lógica adicional após o registro bem-sucedido (por exemplo, redirecionar para outra página)
    } catch (error) {
      console.error('Error registering user:', error);
      // Lógica para lidar com erros de registro (por exemplo, exibir mensagem de erro para o usuário)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} className={styles.input} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} />
        <input type="text" name="username" placeholder="Nome de usuário" value={formData.username} onChange={handleChange} className={styles.input} />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} className={styles.input} />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      {registrationSuccess && (
        <div className={styles.successMessage}>
          <p>Registro bem-sucedido!</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
