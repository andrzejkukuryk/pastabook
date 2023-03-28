import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../data/authProvider";

interface UserProfileChangePasswordProps {
  setPasswordPanelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function UserProfileChangePassword({
  setPasswordPanelExpanded,
}: UserProfileChangePasswordProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();
  const {
    user,
    changePassword,
    passwordChanged,
    errorMessage,
    setErrorMessage,
  } = useAuthContext();

  const onSubmit = (data: ChangePasswordFormValues) => {
    if (user) {
      changePassword(user?.email, data.oldPassword, data.newPassword);
    }
  };

  const discardChangesPasswordButton = useRef(null);

  const clickDiscardButton = () => {
    if (passwordChanged) {
      //@ts-ignore
      discardChangesPasswordButton.current.click();
    }
  };
  useEffect(() => {
    clickDiscardButton();
  }, [passwordChanged]);

const handleClickDiscardChanges = () => {
  reset();
  setPasswordPanelExpanded(false);
};

return (
  <Container className="m-0">
    <Row>
      <Col>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            controlId="oldPassword"
            className="mt-3  col-lg-4 col-md-6 col-12"
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
                onChange: () => {
                  setErrorMessage("");
                },
              })}
            />
            {errors.oldPassword && (
              <p className="errorMsg">{errors.oldPassword.message}</p>
            )}
            {errorMessage === "INVALID_PASSWORD" && (
              <p className="errorMsg"> Password incorrect</p>
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
            className="mt-3 col-lg-4 col-md-6 col-xs-12"
          >
            <Form.Label>Confirm your password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Type your new password again"
              {...register("confirmNewPassword", {
                required: true,
                validate: (cfirmPassword) =>
                  watch("newPassword") === cfirmPassword,
              })}
            />
            {errors.confirmNewPassword &&
              errors.confirmNewPassword.type === "required" && (
                <p className="errorMsg">
                  New password's confirmation is required.
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
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#changePasswordPanel"
            aria-expanded="true"
            aria-controls="changePasswordPanel"
            className="mt-4"
            ref={discardChangesPasswordButton}
            onClick={handleClickDiscardChanges}
          >
            Discard changes
          </Button>
        </form>
      </Col>
    </Row>
  </Container>
);
}
