import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { users } from "../../data/dummyUsersData";
import { AuthContext } from "../authProvider";
import { useAuthContext } from "../authProvider";

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

  // dlaczego nie działa??
  // @ts-ignore
  const { handleLogin } = useAuthContext();

  const onSubmit = (data: LoginFormValues) => {
    const auth: boolean = users.some(
      (user) => user.email === data.email && user.password === data.password
    );
    if (auth) {
      handleLogin();
    }
    console.log(data);
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
          <label htmlFor="loginPassword">Password:</label>
          <input
            id="loginPassword"
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
          <label></label>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
