import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Recipe } from "../../../models/recipe";
import draftToHtml from "draftjs-to-html";
import { AddRecipeMethod } from "../addRecipeMethod";
import { AddRecipePhoto } from "../addRecipePhoto";
import { useRecipeContext } from "../../../data/recipeProvider";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { ReactComponent as BiTrash3Sm } from "../../../assets/bi-trash3-sm.svg";
import { ReactComponent as BiPlus } from "../../../assets/bi-plus.svg";
import { ReactComponent as BiExclamationCircle } from "../../../assets/bi-exclamation-circle.svg";
import { ReactComponent as BiCheckLg } from "../../../assets/bi-check-lg.svg";
import { ReactComponent as BiInfoCircle } from "../../../assets/bi-info-circle.svg";
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
      <div key={`addedIngredient${index}`} className="mb-2 mb-md-0">
        <Form.Group
          className="mb-md-3 col-xl-4 col-lg-5 col-md-6 col-12 d-inline-block"
          controlId={`ingredient${index}`}
        >
          <Form.Control
            required
            type="text"
            placeholder="Type ingredient name (max. 20 characters)"
            maxLength={20}
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
          className="mb-2"
          variant="white"
          onClick={() => {
            setValidated(false);
            handleClickRemove(index);
          }}
        >
          <BiTrash3Sm />
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
        },
        (error) => {
          console.error("upload error: ", error);
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
              <BiExclamationCircle />
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
              <BiCheckLg />
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
              <BiInfoCircle />
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
            <Form.Group className="mb-3 col-xl-4 col-lg-5 col-md-6 col-xs-12">
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
            <Form.Group className="mb-3 col-xl-4 col-lg-5 col-md-6 col-xs-12">
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
                <Col className="col-xl-4 col-lg-5 col-md-6 col-12 d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    className="d-block border-0"
                    onClick={addIngredient}
                  >
                    <BiPlus />
                    add another
                  </Button>
                </Col>
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
