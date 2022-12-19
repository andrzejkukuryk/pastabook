import React, { useContext } from "react";
import { AuthContext } from "../authProvider";

export function AddRecipe() {
  const token = useContext(AuthContext);
  return <div>{token && <p>Add new recipe</p>}</div>;
}
