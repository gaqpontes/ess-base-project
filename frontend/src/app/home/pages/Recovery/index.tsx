import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../../shared/components/Button";
import styles from "./index.module.css";
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const PasswordRecoveryFormSchema = z.object({
  email: z.string().email(),
});

type PasswordRecoveryFormType = z.infer<typeof PasswordRecoveryFormSchema>;

const PasswordRecovery = () => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }, 
    reset,
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(PasswordRecoveryFormSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PasswordRecoveryFormType> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5001/api/recovery/createtoken', data);
      reset();
      setMessage(response.data.msg);
      console.log(response.data);
      navigate('/changepass', { state: { message: response.data.msg } });
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.msg);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Recuperação de Senha</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
              data-cy="input-name"
              {...register("email")}
              placeholder="Digite o seu e-mail"
              className={styles.formInput}
            />          
          {errors.email && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.email.message}
            </span>
          )}
        </div>
        <Button type="submit">Recuperar</Button>
        {message && <p>{message}</p>}
      </form>
        <Link to="/login">
          <Button type="submit">Voltar ao login</Button>
        </Link>      
    </section>
  );
};

export default PasswordRecovery;