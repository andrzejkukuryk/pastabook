import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../authProvider";
import styles from "./style.module.css";

export function UserProfile() {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className={styles.container}>
      <h2>User's account</h2>
      <table>
        <tr>
          <td>login: </td>
          <td>{user?.email}</td>
        </tr>
        <tr>
          <td>name: </td>
          <td>{user?.name}</td>
        </tr>
        <tr>
          <td>profile photo: </td>
          <td>
            {
              // path to photo
            }
          </td>
        </tr>
      </table>
      <Link to="/editprofile">
        <button>Edit profile</button>
      </Link>
    </div>
  );
}
