import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../data/authProvider";

interface UserProfileChangeNameProps {
  setNamePanelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangeNameFormValue {
  newName: string;
}

export function UserProfileChangeName({
  setNamePanelExpanded,
}: UserProfileChangeNameProps) {
  const { user, editUser } = useAuthContext();
  const {
    register,
    handleSubmit,

    reset,
  } = useForm<ChangeNameFormValue>();

  const onSubmit = (data: ChangeNameFormValue) => {
    console.log("newName: ", data.newName);
    editUser(data.newName);
  };

  return (
    <Container className="p-0 m-0">
      <Row>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              controlId="newName"
              className="col-lg-4 col-md-6 col-xs-12"
            >
              <Form.Control
                type="text"
                placeholder={user?.name ? user.name : "Type name or nickname"}
                // value={user?.name ? user.name : "Type name or nickname"}
                {...register("newName", { required: false })}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="me-3 mt-4"
              data-bs-toggle="collapse"
              data-bs-target="#changeNamePanel"
              aria-expanded="true"
              aria-controls="changeNamePanel"
              onClick={() => {
                setNamePanelExpanded(false);
              }}
            >
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
              onClick={() => {
                reset();
                setNamePanelExpanded(false);
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
