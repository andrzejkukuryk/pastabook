import React, { useContext } from "react";

export function AddRecipe() {
  const token = useContext(AuthContext);
  return (
    <div>
      <p>Add new recipe</p>
    </div>
  );
}
