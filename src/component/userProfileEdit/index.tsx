import React, { useState } from "react";
import styles from "./style.module.css";
import { useAuthContext } from "../authProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormUserProfileEditValue {
  name: string;
  //   photoUrl: string;
}

export function UserProfileEdit() {
  const [newName, setNewName] = useState<string | null>(null);

  const { user, editUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserProfileEditValue>();
  const navigate = useNavigate();

  const onSubmit = (data: FormUserProfileEditValue) => {
    setNewName(data.name);
  };

  ///////////////////////////

  ///////////////////////////

  const handleOnClickSave = () => {
    if (typeof newName === "string") {
      editUser(newName);
    }
    navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <h2>Edit user's account</h2>
      <table>
        <tr>
          <td>login: </td>
          <td>{user?.email}</td>
        </tr>
      </table>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newName">name: </label>
        <input
          id="newName"
          type="text"
          placeholder={user?.name} //TODO: path to current name
          {...register("name", {
            required: false,
            onChange(event) {
              setNewName(event.target.value);
            },
          })}
        />
      </form>
      <button onClick={handleOnClickSave}>Save profile</button>
    </div>
  );
}
