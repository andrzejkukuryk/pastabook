import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../data/authProvider";

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
  const { user, changePassword, errorMessage, setErrorMessage } =
    useAuthContext();

  const onSubmit = (data: ChangePasswordFormValues) => {
    if (user) {
      changePassword(user?.email, data.oldPassword, data.newPassword);
    }
  };

  // const addProperties = (value: boolean) => {
  //   const confirmButton = document.getElementById("btnConfirmPassword");
  //   if (value) {
  //     confirmButton?.setAttribute("data-bs-toggle", "collapse");
  //     confirmButton?.setAttribute("data-bs-target", "#changePasswordPanel");
  //     confirmButton?.setAttribute("aria-expanded", "true");
  //     confirmButton?.setAttribute("aria-controls", "#changePasswordPanel");
  //   } else {
  //     confirmButton?.removeAttribute("data-bs-toggle");
  //     confirmButton?.removeAttribute("data-bs-target");
  //     confirmButton?.removeAttribute("aria-expanded");
  //     confirmButton?.removeAttribute("aria-controls");
  //   }
  // };

  // useEffect(() => {
  //   addProperties(errorMessage.length === 0);
  // }, [errorMessage]);

  return (
    <Container className="m-0">
      <Row>
        <Col>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              variant="primary"
              className="me-3 mt-4"
              id="btnConfirmPassword"
            >
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
              onClick={() => {
                reset();
                setPasswordPanelExpanded(false);
              }}
            >
              Discard changes
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
