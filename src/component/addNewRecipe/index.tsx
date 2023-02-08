import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Recipe } from "../../models/recipe";
import draftToHtml from "draftjs-to-html";
import { AddRecipeMethod } from "../addRecipeMethod";
import { AddRecipePhoto } from "../addRecipePhoto";
import { useRecipeContext } from "../../data/recipeProvider";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function AddNewRecipe() {
  const initialNewIngredients = [{ main: false, name: "", ingredientId: 0 }];

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newPastaType, setNewPastaType] = useState<string>("");
  const [newIngredients, setNewIngredients] = useState<NewIngredient[]>(
    initialNewIngredients
  );
  const [noIngredients, setNoIngredients] = useState<boolean>(true);
  const [tooManyMainIngredients, setTooManyMainIngredients] =
    useState<boolean>(false);
  const [newMethod, setNewMethod] = useState<any>({});
  const [methodHasText, setMethodHasText] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

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
            required
            type="text"
            placeholder="Type ingredient name"
            value={ingredient.name}
            onChange={(e) => {
              handleChangeName(e.target.value, index);
            }}
          />
        </Form.Group>
        <Form.Group className=" d-inline-block ms-2">
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

  const countIngredients = () => {
    if (newIngredients.some((ingredient) => ingredient.name.length > 0)) {
      setNoIngredients(false);
    } else {
      setNoIngredients(true);
    }
  };

  useEffect(() => {
    countMainIngredients();
    countIngredients();
  }, [newIngredients]);

  //  create recipe section /////////////////////

  const newMethodHtml = draftToHtml(newMethod);
  const { sendNewRecipe, getRecipes } = useRecipeContext();

  const createRecipeForUpload = () => {
    const newMainIngredients: string[] = [];
    const newOtherIngredients: string[] = [];
    newIngredients.forEach((ingredient) => {
      if (ingredient.name.length > 0) {
        if (ingredient.main) {
          newMainIngredients.push(ingredient.name.toLowerCase());
        } else {
          newOtherIngredients.push(ingredient.name.toLowerCase());
        }
      }
    });

    const recipe: Recipe = {
      dishName: newRecipeName,
      pastaType: newPastaType,
      mainIngredients: newMainIngredients,
      ingredients: newOtherIngredients,
      method: newMethodHtml,
      imageSource:
        "https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg",
      rate: 2.1,
    };

    return recipe;
  };

  const countErrors = () => {
    const errors = [
      newRecipeName.length === 0,
      newPastaType.length === 0,
      tooManyMainIngredients,
      noIngredients,
      !methodHasText,
    ];
    return errors.filter((err) => err).length;
  };

  const noErrors = countErrors() === 0;

  const handleScrollOnTop = () => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const recipeHrefAfterUpload = () => {
    const dishname = newRecipeName.toLowerCase().replace(/\s+/g, "");
    const href = `/recipes/${dishname}`;

    return href;
  };

  const handleClickSave = () => {
    if (noErrors) {
      sendNewRecipe(createRecipeForUpload());
    }
    handleScrollOnTop();
  };

  const clearAndBackHome = () => {
    setNewRecipeName("");
    setNewPastaType("");
    setNewIngredients(initialNewIngredients);
    setNewMethod({});
    navigate("/");
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container id="top">
      <Row>
        <Col>
          <h2 className="h2">Add new recipe</h2>
        </Col>
      </Row>
      {validated && countErrors() > 0 && (
        <Row>
          <Col>
            <Alert variant="danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-exclamation-circle me-1"
                viewBox="0 2 20 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <b>There are some errors({countErrors()}). </b> Please correct
              them.
            </Alert>
          </Col>
        </Row>
      )}
      {validated && countErrors() === 0 && (
        <Row>
          <Col>
            <Alert variant="success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-check-lg me-1"
                viewBox="0 2 20 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
              New recipe added correctly. Click{" "}
              <Alert.Link href={recipeHrefAfterUpload()}>here</Alert.Link> to
              see your recipe or <Alert.Link href="/">here</Alert.Link> to back
              to homepage.
            </Alert>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label className="h4">General</Form.Label>
            <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12">
              <Form.Label>Dish name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type dish name"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Dish name cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12">
              <Form.Label>Pasta type</Form.Label>
              <Form.Select
                value={newPastaType}
                onChange={(e) => setNewPastaType(e.target.value)}
                required
              >
                <option disabled selected value={""}>
                  Select pasta type
                </option>
                {createOptions()}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose pasta type
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Label className="h4 mt-3">Ingredients</Form.Label>
            <Form.Text className="d-block">
              Add new ingredients and mark 1-3 main ingredients
            </Form.Text>

            {createIngredientsList()}
            {noIngredients && validated && (
              <Form.Text className="text-danger">
                You have to add at least 1 ingredient
              </Form.Text>
            )}
            {tooManyMainIngredients && validated && (
              <Form.Text className="text-danger">
                You can set max 3 main ingredients
              </Form.Text>
            )}
            <Container fluid>
              <Row>
                <Col className="col-lg-4 col-md-6 col-xs-12 d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    className="d-block border-0"
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
            <Form.Group>
              <AddRecipeMethod
                setNewMethod={setNewMethod}
                methodHasText={methodHasText}
                setMethodHasText={setMethodHasText}
                validated={validated}
              />
              {!methodHasText && validated && (
                <Form.Text className="text-danger">
                  Method description cannot be empty
                </Form.Text>
              )}
            </Form.Group>
            <Form.Label className="h4 mt-4">Photo</Form.Label>
            <Form.Text className="d-block">
              Please add a photo of a dish in .JPG .PNG or .GIF format
            </Form.Text>
            <AddRecipePhoto />
            <Button
              type="submit"
              variant="primary"
              className="mt-3 mb-5 me-2"
              onClick={handleClickSave}
            >
              Save
            </Button>
            <Button
              variant="outline-primary"
              className="mt-3 mb-5"
              onClick={clearAndBackHome}
            >
              Discard and close
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
