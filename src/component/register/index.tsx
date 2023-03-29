import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../data/authProvider";


interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const { submitRegisterPressed, errorMessage, setErrorMessage, isLoading } =
    useAuthContext();
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

const handleClickBack = () => navigate("/");

return (
  <Container className="mt-4">
    <Row>
      <Col>
        <h2 className="h2 mb-4">Sign up for Pastabook</h2>
      </Col>
    </Row>
    {isLoading && (
      <Row>
        <p>Loading</p>
      </Row>
    )}
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="email" className="mt-3 col-lg-4 col-md-6 col-12">
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
        className="mt-3 col-lg-4 col-md-6 col-12"
      >
        <Form.Label>Name or nick</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type your name or nick"
          {...register("username", {
            required: false,
            maxLength: {
              value: 50,
              message: "Are you sure your name is longer than 50 characters?",
            },
          })}
        />
        {errors.username && (
          <p className="errorMsg">{errors.username.message}</p>
        )}
      </Form.Group>
      <Form.Group
        controlId="password"
        className="mt-3 col-lg-4 col-md-6 col-12"
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
        className="mt-3 col-lg-4 col-md-6 col-12"
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
      <Button type="submit" variant="primary" className="me-3 mt-4">
        Sign up
      </Button>
      <Button
        variant="outline-primary"
        className="mt-4"
        onClick={handleClickBack}
      >
        Back to homepage
      </Button>
    </form>
    <Row>
      <Col>
        <p className="mt-4 h6">
          Already a member?
          <Link to="/login" className="sign-up-link ms-2 noUnderline">
            Log in
          </Link>
        </p>
      </Col>
    </Row>
  </Container>
);
}
