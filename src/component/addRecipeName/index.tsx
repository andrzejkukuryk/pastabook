import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

interface AddRecipeNameProps {
  newRecipeName: string;
  setNewRecipeName: React.Dispatch<React.SetStateAction<string>>;
}

interface FormRecipeNameValue {
  name: string;
}

export function AddRecipeName({
  newRecipeName,
  setNewRecipeName,
}: AddRecipeNameProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRecipeNameValue>();

  const onSubmit = (data: FormRecipeNameValue) => {
    setNewRecipeName(data.name);
  };

  return (
    <Form.Group controlId="name" className="mb-3 col-lg-4 col-md-6 col-xs-12">
      <Form.Label>Dish name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Type dish name"
        {...register("name", {
          required: "Dish name cannot be empty.",
          onChange(event) {
            setNewRecipeName(event.target.value);
          },
        })}
      />
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}
    </Form.Group>
  );
}
