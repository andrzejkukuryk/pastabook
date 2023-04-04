import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { ReactComponent as BiFiletypeJpg } from "../../../assets/bi-filetype-jpg.svg";
import { ReactComponent as BiFiletypeGif } from "../../../assets/bi-filetype-gif.svg";
import { ReactComponent as BiFiletypePng } from "../../../assets/bi-filetype-png.svg";
import { ReactComponent as BiTrash3Lg } from "../../../assets/bi-trash3-lg.svg";
import "./style.css";
import { type } from "os";

const fileTypes = ["JPG", "PNG", "GIF"];

export type NullOrFile = null | File;

interface DragDropProps {
  setNewRecipePhoto: React.Dispatch<React.SetStateAction<NullOrFile>>;
  photoUploadProgress: number;
  newPhotoUrl: string;
  deletePhoto: () => void;
}

export function DragDrop({
  setNewRecipePhoto,
  photoUploadProgress,
  newPhotoUrl,
  deletePhoto,
}: DragDropProps) {
  const [file, setFile] = useState<NullOrFile>(null);
  const handleChange = (file: File) => {
    setFile(file);
    setNewRecipePhoto(file);
  };

  const jpgIcon = <BiFiletypeJpg />;

  const gifIcon = <BiFiletypeGif />;

  const pngIcon = <BiFiletypePng />;

  const customDragNDropArea = (
    <div className=" border border-primary rounded-2 p-2 w-100">
      {jpgIcon}
      {gifIcon}
      {pngIcon}
      <div className="h6 mt-2 mb-5">
        To add a photo <a href="#">click</a> or drop a file here
      </div>
    </div>
  );

  return (
    <div className="border border-1 rounded-2 p-3 setLabelWidth">
      <FileUploader
        handleChange={handleChange}
        name="file"
        label="upload or drag and drop here only one photo"
        types={fileTypes}
        multiple={false}
        children={customDragNDropArea}
      />
      <p>{file ? `File name: ${file.name}` : "no file uploaded yet"}</p>
      {!newPhotoUrl && file && <div>uploaded {photoUploadProgress}%</div>}
      {newPhotoUrl && file && (
        <div className="photoPreviewDiv">
          <img
            className="photoPreview"
            src={newPhotoUrl}
            id="uploadedPhotoPreview"
            alt="Recipe preview"
          />

          <Button
            variant="white"
            onClick={() => {
              deletePhoto();
              setFile(null);
            }}
          >
            <BiTrash3Lg />
          </Button>
        </div>
      )}
    </div>
  );
}
