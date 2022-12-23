import React from "react";
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
    <div className={styles.container}>
      <form>
        <label htmlFor="newPastaType">Pasta type</label>
        <select
          id="newPastaType"
          {...register("pastaType", {
            required: true,
            onChange(event) {
              setNewPastaType(event.target.value);
            },
          })}
        >
          <option value="" disabled selected>
            Select pasta type
          </option>
          {createOptions()}
        </select>
        {errors.pastaType && errors.pastaType.type === "required" && (
          <p>Please, type a dish's name.</p>
        )}
      </form>
    </div>
  );
}
