import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log('Response:', response.data);
      // Lógica adicional após o registro bem-sucedido (por exemplo, redirecionar para outra página)
    } catch (error) {
      console.error('Error registering user:', error);
      // Lógica para lidar com erros de registro (por exemplo, exibir mensagem de erro para o usuário)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="username" placeholder="Nome de usuário" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistrationForm;
