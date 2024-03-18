import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../../shared/components/Button";
import styles from "./index.module.css";
import axios from 'axios';
import { useState } from 'react';

const ChangePassFormSchema = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type ChangePassFormType = z.infer<typeof ChangePassFormSchema>;

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassFormType>({
    resolver: zodResolver(ChangePassFormSchema),
  });

  const location = useLocation();
  const message = location.state?.message;
  const [apiMessage, setApiMessage] = useState('');
  const [apiMessageS, setApiMessageS] = useState('');

  const onSubmit: SubmitHandler<ChangePassFormType> = async (data) => {
    setApiMessage("");
    setApiMessageS("");
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5001/api/recovery/chgpwd', data);
      setApiMessageS(response.data.msg);
      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setApiMessage(error.response.data.msg);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Password Recovery</h1>
      {message && <p id='successMessage' className={styles.info}>{message}</p>}
      <br />

      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-token"
            {...register("token")}
            placeholder="Token sent to mail"
            className={styles.formInput}
          />
          {errors.token && (
            <span data-cy="input-token-error" className={styles.formError}>
              {errors.token.message}
            </span>
          )}
        </div>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-email"
            {...register("email")}
            placeholder="E-mail"
            className={styles.formInput}
          />
          {errors.email && (
            <span data-cy="input-email-error" className={styles.formError}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-password"
            {...register("password")}
            placeholder="New password"
            className={styles.formInput}
          />
          {errors.password && (
            <span data-cy="input-password-error" className={styles.formError}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-confirm-password"
            {...register("confirmPassword")}
            placeholder="Repeat new password"
            className={styles.formInput}
          />
          {errors.confirmPassword && (
            <span data-cy="input-confirm-password-error" className={styles.formError}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button data-cy="recover-button" id='submitButton' type="submit">Change password</Button>
        {apiMessage && <p id="alert" className={styles.alert}>{apiMessage}</p>}
        {apiMessageS && <p id="alert-success" className={styles.success}>{apiMessageS}</p>}
      </form>
      <br></br><a href="/login" className={styles.underline}>Login here</a>
    </section>
  );
};

export default ChangePass;