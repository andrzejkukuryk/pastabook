import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./style.module.css";

const fileTypes = ["JPG", "PNG", "GIF"];

export function DragDrop() {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState<any>("");
  const handleChange = (file: any) => {
    setFile(file);
  };

  function previewFile() {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setPreviewSrc(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => previewFile(), [file]);

  return (
    <div>
      <FileUploader
        handleChange={handleChange}
        name="file"
        label="upload or drag and drop here only one photo of a dish"
        types={fileTypes}
        multiple={false}
      />
      <p>
        {file
          ? //@ts-ignore
            `File name: ${file.name}`
          : "no file uploaded yet"}
      </p>
      {file && (
        <div className={styles.photoPreviewDiv}>
          <img
            className={styles.photoPreview}
            src={previewSrc}
            id="uploadedPhotoPreview"
            alt="Recipe photo preview"
          />
          <button type="button" onClick={() => setFile(null)}>
            remove
          </button>
        </div>
      )}
    </div>
  );
}
