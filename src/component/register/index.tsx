import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";
import styles from "./style.module.css";

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const {
    submitRegisterPressed,
    editUser,
    token,
    errorMessage,
    setErrorMessage,
    isLoading,
  } = useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    const registerRequestData = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    submitRegisterPressed(registerRequestData);
  };

  return (
    // <div className={styles.container}>
    //   <h2>Sign up for Pastabook:</h2>
    //   {isLoading && <p>Loading</p>}
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className={styles.formInputDiv}>
    //       <label htmlFor="registerEmail">Email:</label>
    //       <input
    //         id="registerEmail"
    //         type="text"
    //         {...register("email", {
    //           required: true,
    //           pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    //           onChange: () => setErrorMessage(""),
    //         })}
    //       />
    //       {errors.email && errors.email.type === "required" && (
    //         <p className={styles.errorMsg}>Email is required.</p>
    //       )}
    //       {errors.email && errors.email.type === "pattern" && (
    //         <p className={styles.errorMsg}>Email is not valid.</p>
    //       )}
    //       {errorMessage === "EMAIL_EXISTS" && (
    //         <p className={styles.errorMsg}>Email is in use.</p>
    //       )}
    //     </div>
    //     <div className={styles.formInputDiv}>
    //       <label htmlFor="registerUsername">Name or nick:</label>
    //       <input
    //         id="registerUsername"
    //         type="text"
    //         {...register("username", {
    //           required: false,
    //         })}
    //       />
    //     </div>
    //     <div className={styles.formInputDiv}>
    //       <label htmlFor="registerPassword">Password:</label>
    //       <input
    //         id="registerPassword"
    //         type="password"
    //         {...register("password", { required: true, minLength: 8 })}
    //       />
    //       {errors.password && errors.password.type === "required" && (
    //         <p className={styles.errorMsg}>Password is required.</p>
    //       )}
    //       {errors.password && errors.password.type === "minLength" && (
    //         <p className={styles.errorMsg}>
    //           Password needs at least 8 charackters.
    //         </p>
    //       )}
    //     </div>
    //     <div className={styles.formInputDiv}>
    //       <label htmlFor="registerConfirmPassword">Confirm password:</label>
    //       <input
    //         id="registerConfirmPassword"
    //         type="password"
    //         {...register("confirmPassword", {
    //           required: true,
    //           validate: (cfirmPassword) => watch("password") === cfirmPassword,
    //         })}
    //       />
    //       {errors.confirmPassword &&
    //         errors.confirmPassword.type === "required" && (
    //           <p className={styles.errorMsg}>
    //             Password's confirmation is required.
    //           </p>
    //         )}
    //       {errors.confirmPassword &&
    //         errors.confirmPassword.type === "validate" && (
    //           <p className={styles.errorMsg}>Passwords need to be the same.</p>
    //         )}
    //     </div>
    //     <div className={styles.formInputDiv}>
    //       <label></label>
    //       <button className={styles.btn} type="submit">
    //         Sign up
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <Container>
      <Row>
        <Col>
          <h2 className="h2 mb-4">Sign up for Pastabook</h2>
        </Col>
      </Row>
      {/* <h2>Sign up for Pastabook:</h2> */}

      {isLoading && (
        <Row>
          <p>Loading</p>
        </Row>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group
          controlId="email"
          className="mt-3 col-lg-4 col-md-6 col-xs-12"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Type your email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email",
              },
              onChange: () => setErrorMessage(""),
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
          {errorMessage === "EMAIL_EXISTS" && (
            <p className="errorMsg"> Email is in use.</p>
          )}
        </Form.Group>
        <Form.Group
          controlId="username"
          className="mt-3  col-lg-4 col-md-6 col-xs-12"
        >
          <Form.Label>Name or nick</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your name or nick"
            {...register("username", {
              required: false,
            })}
          />
        </Form.Group>
        <Form.Group
          controlId="password"
          className="mt-3  col-lg-4 col-md-6 col-xs-12"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Type your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password needs at least 8 charackters",
              },
            })}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
        </Form.Group>

        <Form.Group
          controlId="confirmPassword"
          className="mt-3  col-lg-4 col-md-6 col-xs-12"
        >
          <Form.Label>Confirm your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Type your password again"
            {...register("confirmPassword", {
              required: true,
              validate: (cfirmPassword) => watch("password") === cfirmPassword,
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "required" && (
              <p className="errorMsg">Password's confirmation is required.</p>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <p className="errorMsg">Passwords need to be the same.</p>
            )}
        </Form.Group>
        <label></label>
        <Button type="submit" variant="secondary" className="me-3 mt-4">
          Sign up
        </Button>
        <Button
          variant="outline-secondary"
          className="mt-4"
          onClick={() => navigate("/")}
        >
          Back to homepage
        </Button>

        {/* <div className={styles.formInputDiv}>
          <label></label>
          <button className={styles.btn} type="submit">
            Sign up
          </button>
        </div> */}
      </form>
      <Row>
        <Col>
          <p className="mt-3 h6">
            Already a member?
            <Link to="/login" className="sign-up-link ms-2">
              Log in
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
