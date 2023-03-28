import React, { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../data/authProvider";

interface UserProfileChangeNameProps {
  setNamePanelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangeNameFormValue {
  newName: string;
}

export function UserProfileChangeName({
  setNamePanelExpanded,
}: UserProfileChangeNameProps) {
  const { user, editUser, usernameChanged } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeNameFormValue>();

  const discardChangeNameButton = useRef(null);

  const onSubmit = async (data: ChangeNameFormValue) => {
    await editUser(data.newName);
    if (usernameChanged) {
      //@ts-ignore
      discardChangeNameButton.current.click();
    }
  };

  const handleClickDiscardChanges = () => {
    reset();
    setNamePanelExpanded(false);
  };

  return (
    <Container className="p-0 m-0">
      <Row>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              controlId="newName"
              className="col-lg-4 col-md-6 col-12"
            >
              <Form.Control
                type="text"
                placeholder={user?.name ? user.name : "Type name or nickname"}
                {...register("newName", {
                  required: false,
                  maxLength: {
                    value: 50,
                    message:
                      "Are you sure your name is longer than 50 characters?",
                  },
                })}
              />
              {errors.newName && (
                <p className="errorMsg">{errors.newName.message}</p>
              )}
            </Form.Group>
            <Button type="submit" variant="primary" className="me-3 mt-4">
              Save name
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#changeNamePanel"
              aria-expanded="true"
              aria-controls="changeNamePanel"
              className="mt-4"
              ref={discardChangeNameButton}
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
