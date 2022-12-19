import React from "react";
import { useForm } from "react-hook-form";
import { User, users } from "../../data/dummyUsersData";
import styles from "./style.module.css";

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = (data: RegisterFormValues) => {
    const newRegisteredUser: User = {
      username: data.username ? data.username : "",
      id: users[users.length - 1].id + 1,
      email: data.email,
      password: data.password,
    };
    users.push(newRegisteredUser);
    console.log(newRegisteredUser);
  };

  return (
    <div className={styles.container}>
      <h2>Sign up for Pastabook:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputDiv}>
          <label htmlFor="registerEmail">Email:</label>
          <input
            id="registerEmail"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className={styles.errorMsg}>Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className={styles.errorMsg}>Email is not valid.</p>
          )}
        </div>
        <div className={styles.formInputDiv}>
          <label htmlFor="registerUsername">Name or nick:</label>
          <input
            id="registerUsername"
            type="text"
            {...register("username", {
              required: false,
            })}
          />
        </div>
        <div className={styles.formInputDiv}>
          <label htmlFor="registerPassword">Password:</label>
          <input
            id="registerPassword"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className={styles.errorMsg}>Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className={styles.errorMsg}>
              Password needs at least 8 charackters.
            </p>
          )}
        </div>
        <div className={styles.formInputDiv}>
          <label htmlFor="registerConfirmPassword">Confirm password:</label>
          <input
            id="registerConfirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (cfirmPassword) => watch("password") === cfirmPassword,
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <p className={styles.errorMsg}>
                Password's confirmation is required.
              </p>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <p className={styles.errorMsg}>Passwords need to be the same.</p>
            )}
        </div>
        <div className={styles.formInputDiv}>
          <label></label>
          <button className={styles.btn} type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
