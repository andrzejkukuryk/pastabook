import React from "react";
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newRecipeName">Recipe name</label>
        <input
          id="newRecipeName"
          type="text"
          placeholder="Type dish name"
          {...register("name", {
            required: true,
            onChange(event) {
              setNewRecipeName(event.target.value);
            },
          })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>Please, type a dish's name.</p>
        )}
      </form>
    </div>
  );
}
