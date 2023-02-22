import React from "react";
import { DragDrop } from "../dragDrop";

interface AddRecipePhotoProps {
  setNewRecipePhoto: React.Dispatch<React.SetStateAction<null>>;
  photoUploadProgress: number;
  newPhotoUrl: string;
  deletePhoto: () => void;
}

export function AddRecipePhoto({
  setNewRecipePhoto,
  photoUploadProgress,
  newPhotoUrl,
  deletePhoto,
}: AddRecipePhotoProps) {
  return (
    <div className="mt-2 col-lg-4 col-md-6 col-xs-12">
      <DragDrop
        setNewRecipePhoto={setNewRecipePhoto}
        photoUploadProgress={photoUploadProgress}
        newPhotoUrl={newPhotoUrl}
        deletePhoto={deletePhoto}
      />
    </div>
  );
}
