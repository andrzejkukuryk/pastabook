import React from "react";
import { set, useForm } from "react-hook-form";
import styles from "./style.module.css";
import { useAuthContext } from "../authProvider";
import { Container, Form } from "react-bootstrap";

interface LoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { loginUser, errorMessage, setErrorMessage } = useAuthContext();

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data.email, data.password);
  };

  return (
    <div className={styles.container}>
      <h2>Login to Pastabook:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInputDiv}>
          <label htmlFor="loginEmail">Email:</label>
          <input
            id="loginEmail"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              onChange: () => setErrorMessage(""),
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className={styles.errorMsg}>Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className={styles.errorMsg}>Email is not valid.</p>
          )}
          {errorMessage === "EMAIL_NOT_FOUND" && (
            <p className={styles.errorMsg}>Email not found.</p>
          )}
        </div>
        <div className={styles.formInputDiv}>
          <label htmlFor="loginPassword">Password:</label>
          <input
            id="loginPassword"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              onChange: () => setErrorMessage(""),
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className={styles.errorMsg}>Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className={styles.errorMsg}>
              Password needs at least 8 charackters.
            </p>
          )}
          {errorMessage === "INVALID_PASSWORD" && (
            <p className={styles.errorMsg}>Password incorrect.</p>
          )}
        </div>
        <div className={styles.formInputDiv}>
          <label></label>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
