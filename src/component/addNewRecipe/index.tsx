import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Recipe } from "../../models/recipe";
import draftToHtml from "draftjs-to-html";
import { AddRecipeMethod } from "../addRecipeMethod";
import { AddRecipePhoto } from "../addRecipePhoto";
import { useRecipeContext } from "../../data/recipeProvider";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import "./style.css";

export function AddNewRecipe() {
  const initialNewIngredients = [{ main: false, name: "", ingredientId: 0 }];

  const [newRecipeName, setNewRecipeName] = useState<string>("");
  const [newPastaType, setNewPastaType] = useState<string>("");
  const [newIngredients, setNewIngredients] = useState<NewIngredient[]>(
    initialNewIngredients
  );
  const [noIngredients, setNoIngredients] = useState<boolean>(true);
  const [noMainIngredients, setNoMainIngredients] = useState<boolean>(false);
  const [tooManyMainIngredients, setTooManyMainIngredients] =
    useState<boolean>(false);
  const [newMethod, setNewMethod] = useState<any>({});
  const [methodHasText, setMethodHasText] = useState<boolean>(false);
  const [newRecipePhoto, setNewRecipePhoto] = useState(null);
  const [photoUploadProgress, setPhotoUploadProgress] = useState<number>(0);
  const [photoUploadedName, setPhotoUploadedName] = useState<string>("");
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [submited, setSubmited] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

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
      <div key={`addedIngredient${index}`}>
        <Form.Group
          className="mb-3 col-lg-4 col-md-6 col-xs-12 d-inline-block"
          controlId={`ingredient${index}`}
        >
          <Form.Control
            required
            type="text"
            placeholder="Type ingredient name"
            value={ingredient.name}
            onChange={(e) => {
              setValidated(false);
              handleChangeName(e.target.value, index);
            }}
          />
        </Form.Group>
        <Form.Group
          className=" d-inline-block ms-2"
          controlId={`mainSwitch${index}`}
        >
          <Form.Check
            type="switch"
            label="main ingredient"
            checked={ingredient.main}
            onChange={() => {
              setValidated(false);
              handleChangeMain(index);
            }}
          />
        </Form.Group>
        <Button
          variant="white"
          onClick={() => {
            setValidated(false);
            handleClickRemove(index);
          }}
        >
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
    if (mainCounter === 0) {
      setNoMainIngredients(true);
    } else {
      setNoMainIngredients(false);
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

  // photo section //////////////////////////////

  const uploadPhoto = async () => {
    if (photoUploadedName) {
      deletePhoto();
    }
    const file = newRecipePhoto;

    if (!file) {
      return;
    } else {
      //@ts-ignore
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      //@ts-ignore
      const fileName = file.name;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPhotoUploadProgress(progress);
          console.log("upload progress:", photoUploadProgress);
        },
        (error) => {
          console.log("upload error: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewPhotoUrl(downloadURL);
            setPhotoUploadedName(fileName);
          });
        }
      );
    }
  };

  const deletePhoto = () => {
    //@ts-ignore
    const photoRef = ref(storage, `images/${photoUploadedName}`);
    deleteObject(photoRef);
    setNewPhotoUrl("");
    setPhotoUploadedName("");
  };

  useEffect(() => {
    uploadPhoto();
  }, [newRecipePhoto]);

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
      imageSource: newPhotoUrl
        ? newPhotoUrl
        : "https://firebasestorage.googleapis.com/v0/b/pastabook-e1b8c.appspot.com/o/images%2FdefaultRecipePhoto.jpg?alt=media&token=949734d1-367f-4f44-9c6b-583110baec68",
      rate: [0],
    };

    return recipe;
  };

  const countErrors = () => {
    const errors = [
      newRecipeName.length === 0,
      newPastaType.length === 0,
      noMainIngredients,
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

  const handleClickSave = async () => {
    if (submited) {
      setShowWarning(true);
    } else if (noErrors && !submited) {
      sendNewRecipe(createRecipeForUpload());
      getRecipes();
      setSubmited(true);
    }
    await handleScrollOnTop();
  };

  const clearAndBackHome = () => {
    setNewRecipeName("");
    setNewPastaType("");
    setNewIngredients(initialNewIngredients);
    setNewMethod({});
    navigate("/");
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

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
      {validated && noErrors && (
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
              <Link to={recipeHrefAfterUpload()} className="alert-link">
                here
              </Link>{" "}
              to see your recipe or{" "}
              <Link to="/" className="alert-link">
                here
              </Link>{" "}
              to back to homepage.
            </Alert>
          </Col>
        </Row>
      )}
      {showWarning && (
        <Row>
          <Col>
            <Alert variant="warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle me-1"
                viewBox="0 2 20 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              You have already added this recipe. Click{" "}
              <Link className="alert-link" to="/add">
                here
              </Link>{" "}
              if you would like to add another.
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
                onChange={(e) => {
                  setValidated(false);
                  setNewRecipeName(e.target.value);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Dish name cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-lg-4 col-md-6 col-xs-12">
              <Form.Label>Pasta type</Form.Label>
              <Form.Select
                defaultValue={""}
                onChange={(e) => {
                  setValidated(false);
                  setNewPastaType(e.target.value);
                }}
                required
              >
                <option disabled value={""}>
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
                <br />
              </Form.Text>
            )}
            {noMainIngredients && validated && (
              <Form.Text className="text-danger">
                You have to set at least 1 main ingredient
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
                        fillRule="evenodd"
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
                setValidated={setValidated}
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
            <AddRecipePhoto
              setNewRecipePhoto={setNewRecipePhoto}
              photoUploadProgress={photoUploadProgress}
              newPhotoUrl={newPhotoUrl}
              deletePhoto={deletePhoto}
            />
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
