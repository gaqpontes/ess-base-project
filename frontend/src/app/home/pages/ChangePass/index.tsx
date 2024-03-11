import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../../shared/components/Button";
import styles from "./index.module.css";
import axios from 'axios';

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

  const onSubmit: SubmitHandler<ChangePassFormType> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5001/api/recovery/changepassword', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Alteração de Senha</h1>
      {message && <p>{message}</p>}
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputContainer}>
          <input
            data-cy="input-token"
            {...register("token")}
            placeholder="Digite o token"
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
            placeholder="Digite o seu e-mail"
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
            placeholder="Digite a nova senha"
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
            placeholder="Confirme a nova senha"
            className={styles.formInput}
          />
          {errors.confirmPassword && (
            <span data-cy="input-confirm-password-error" className={styles.formError}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button type="submit">Alterar Senha</Button>
      </form>
    </section>
  );
};

export default ChangePass;