import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/register', formData); // Altere a URL conforme necessário
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
            <input type="text" name="username" placeholder="Nome de usuário" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegistrationForm;
