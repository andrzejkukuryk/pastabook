import React from "react";
import { Form, Placeholder } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";

interface AddRecipePastaTypeProps {
  setNewPastaType: React.Dispatch<React.SetStateAction<string>>;
}

interface FormPastaTypeValue {
  pastaType: string;
}

export function AddRecipePastaType({
  setNewPastaType,
}: AddRecipePastaTypeProps) {
  const {
    register,
    formState: { errors },
  } = useForm<FormPastaTypeValue>();

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

  return (
    <Form.Group
      controlId="pastaType"
      className="mb-3 col-lg-4 col-md-6 col-xs-12"
    >
      <Form.Label>Pasta type</Form.Label>
      <Form.Select
        placeholder="Choose"
        {...register("pastaType", {
          required: "Choose pasta type",
          onChange(event) {
            setNewPastaType(event.target.value);
          },
        })}
      >
        <option disabled selected value={""}>
          Select pasta type
        </option>
        {createOptions()}
      </Form.Select>
      {errors.pastaType && (
        <p className="errorMsg">{errors.pastaType.message}</p>
      )}
    </Form.Group>
  );
}
