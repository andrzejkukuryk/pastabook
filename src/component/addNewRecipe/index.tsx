import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AddRecipeMethod } from "../addRecipeMethod";

export function AddNewRecipe() {
  const initialNewIngredients = [{ main: false, name: "", ingredientId: 0 }];

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newPastaType, setNewPastaType] = useState<string>("");
  const [newIngredients, setNewIngredients] = useState<NewIngredient[]>(
    initialNewIngredients
  );
  const [tooManyMainIngredients, setTooManyMainIngredients] =
    useState<boolean>(false);
  const [newMethod, setNewMethod] = useState<any>({});
  const [methodHasText, setMethodHasText] = useState<boolean>(false);

  // pastaTypes section ///////////

  const pastaTypes: string[] = [
    "spaghetti",
    "penne",
    "rigatoni",
    "trofie",
    "casarecce",
    "lasagne",
    "tagliatelle",
    "fettucine",
    "fusili",
    "orecchiette",
    "pici",
    "cannelloni",
    "farfalle",
  ].sort((t1, t2) => {
    if (t1 > t2) {
      return 1;
    }

    if (t1 < t2) {
      return -1;
    }

    return 0;
  });

  const createOptions = () => {
    return pastaTypes.map((pastaType, id) => (
      <option value={pastaType} key={`pastaType${id}`}>
        {pastaType}
      </option>
    ));
  };

  // Ingredients section //////////////////

  interface NewIngredient {
    main: boolean;
    name: string;
    ingredientId?: number;
  }

  let temporaryIngredients: NewIngredient[] = [...newIngredients];
  const emptyIngredient: NewIngredient = {
    main: false,
    name: "",
    ingredientId: 0,
  };

  const addIngredient = () => {
    temporaryIngredients.push(emptyIngredient);
    setNewIngredients(temporaryIngredients);
  };

  const handleChangeName = (newName: string, id: number) => {
    temporaryIngredients[id].name = newName;
    setNewIngredients(temporaryIngredients);
  };

  const handleChangeMain = (id: number) => {
    temporaryIngredients[id].main = !temporaryIngredients[id].main;
    setNewIngredients(temporaryIngredients);
  };

  const handleClickRemove = (id: number) => {
    temporaryIngredients.splice(id, 1);
    setNewIngredients(temporaryIngredients);
  };

  const createIngredientsList = () => {
    return newIngredients.map((ingredient, index) => (
      <div>
        <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12 d-inline-block">
          <Form.Control
            type="text"
            placeholder="Type ingredient name"
            value={ingredient.name}
            onChange={(e) => {
              handleChangeName(e.target.value, index);
            }}
          />
        </Form.Group>
        <Form.Group className=" d-inline-block">
          <Form.Check
            type="switch"
            label="main ingredient"
            checked={ingredient.main}
            onChange={() => {
              handleChangeMain(index);
            }}
          />
        </Form.Group>
        <Button variant="white" onClick={() => handleClickRemove(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </Button>
      </div>
    ));
  };

  const countMainIngredients = () => {
    let mainCounter: number = 0;
    newIngredients.forEach((ingredient) => {
      if (ingredient.main && ingredient.name) {
        mainCounter++;
      }
    });
    if (mainCounter > 3) {
      setTooManyMainIngredients(true);
    } else {
      setTooManyMainIngredients(false);
    }
  };

  useEffect(() => {
    countMainIngredients();
  }, [newIngredients]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="h2">Add new recipe</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Label className="h4">General</Form.Label>
            <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12">
              <Form.Label>Dish name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type dish name"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12">
              <Form.Label>Pasta type</Form.Label>
              <Form.Select
                value={newPastaType}
                onChange={(e) => setNewPastaType(e.target.value)}
              >
                <option disabled selected value={""}>
                  Select pasta type
                </option>
                {createOptions()}
              </Form.Select>
            </Form.Group>
            <Form.Label className="h4 mt-3">Ingredients</Form.Label>
            <Form.Text className="d-block">
              Add new ingredients and mark 1-3 main ingredients
            </Form.Text>

            {createIngredientsList()}
            {tooManyMainIngredients && (
              <Form.Text>You can set max 3 main ingredients</Form.Text>
            )}
            <Container fluid>
              <Row>
                <Col className="col-lg-4 col-md-6 col-xs-12 d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    className="d-block"
                    onClick={addIngredient}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-lg me-1"
                      viewBox="0 2 18 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                      />
                    </svg>
                    add another
                  </Button>
                </Col>
                <Col className="col-lg-8 col-md-6 col-xs-none"></Col>
              </Row>
            </Container>
            <Form.Label className="h4">Method</Form.Label>
            <Form.Text className="d-block">
              Please describe how to prepare the dish
            </Form.Text>
            <AddRecipeMethod
              setNewMethod={setNewMethod}
              setMethodHasText={setMethodHasText}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
