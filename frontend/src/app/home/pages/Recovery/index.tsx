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

  const handleForgotEmail = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/recovery/forgotmail');
      setMessage(response.data.msg);
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
      <h1 className={styles.title}>Password Recovery</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
              data-cy="input-email"
              {...register("email")}
              placeholder="Email"
              className={styles.formInput}
            />          
          {errors.email && (
            <span data-cy="input-name-error" className={styles.formError}>
              {errors.email.message}
            </span>
          )}
        </div>
        <Button type="submit" data-cy="recover-button">Recover</Button>
        {message && <p>{message}</p>}
      </form>
        <br></br><a href="/login" className={styles.underline}>Login here</a>
        <a className={styles.underline} onClick={handleForgotEmail}>Forgot my email</a>
    </section>
  );
};

export default PasswordRecovery;