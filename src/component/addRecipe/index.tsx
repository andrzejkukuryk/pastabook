import React from "react";
import { useAuthContext } from "../authProvider";

export function AddRecipe() {
  const { token } = useAuthContext();
  return <div>{token && <p>Add new recipe</p>}</div>;
}
