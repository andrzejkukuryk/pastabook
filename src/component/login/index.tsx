import React from "react";
import { set, useForm } from "react-hook-form";
import styles from "./style.module.css";
import "./style.css";
import { useAuthContext } from "../authProvider";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data.email, data.password);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="h2 mb-4">Log in</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="mb-3 col-lg-4 col-md-6 col-xs-12"
              controlId="email"
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
              {errors.email && (
                <p className="errorMsg">{errors.email.message}</p>
              )}
              {errorMessage === "EMAIL_NOT_FOUND" && (
                <p className="errorMsg"> Email not found.</p>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3 col-lg-4 col-md-6 col-xs-12"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type password"
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Password needs at least 8 charackters",
                  },
                  onChange: () => setErrorMessage(""),
                })}
              />
              {errors.password && (
                <p className="errorMsg">{errors.password.message}</p>
              )}
              {errorMessage === "INVALID_PASSWORD" && (
                <p className="errorMsg"> Password incorrect</p>
              )}
            </Form.Group>

            <label></label>
            <Button type="submit" variant="secondary" className="me-3">
              Login
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/")}>
              Back to homepage
            </Button>
          </form>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mt-3 h6">
            Don't have an account?
            <Link to="/register" className="sign-up-link ms-2">
              Sign up
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
