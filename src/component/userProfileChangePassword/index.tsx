import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function UserProfileChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();

  return (
    <Container className="m-0">
      <Row>
        <Col>
          <form noValidate>
            <Form.Group
              controlId="oldPassword"
              className="mt-3  col-lg-4 col-md-6 col-xs-12"
            >
              <Form.Label>Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your old password"
                {...register("oldPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password needs at least 8 charackters",
                  },
                })}
              />
              {errors.oldPassword && (
                <p className="errorMsg">{errors.oldPassword.message}</p>
              )}
            </Form.Group>

            <Form.Group
              controlId="newPassword"
              className="mt-3  col-lg-4 col-md-6 col-xs-12"
            >
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your new password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password needs at least 8 charackters",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="errorMsg">{errors.newPassword.message}</p>
              )}
            </Form.Group>

            <Form.Group
              controlId="confirmNewPassword"
              className="mt-3  col-lg-4 col-md-6 col-xs-12"
            >
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password again"
                {...register("confirmNewPassword", {
                  required: true,
                  validate: (cfirmPassword) =>
                    watch("newPassword") === cfirmPassword,
                })}
              />
              {errors.confirmNewPassword &&
                errors.confirmNewPassword.type === "required" && (
                  <p className="errorMsg">
                    Password's confirmation is required.
                  </p>
                )}
              {errors.confirmNewPassword &&
                errors.confirmNewPassword.type === "validate" && (
                  <p className="errorMsg">Passwords need to be the same.</p>
                )}
            </Form.Group>
            <label></label>
            <Button type="submit" variant="primary" className="me-3 mt-4">
              Confirm new password
            </Button>
            <Button
              variant="outline-primary"
              className="mt-4"
              onClick={() => {}}
            >
              Discard changes
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
