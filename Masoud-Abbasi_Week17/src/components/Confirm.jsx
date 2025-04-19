import React, { useState } from "react";
import { useContacts } from "../context/ContactsProvider";
import styles from "./Confirm.module.css";

function Confirm({ contact, message, setConfirm, type }) {
  const { dispatch } = useContacts();
  const [isDeleting, setIsDeleting] = useState(false);

  const yesHandler = (contact, type) => {
    if (type == "add") {
      dispatch({ type: "ADD_CONTACT", payload: contact });
      setConfirm(false);
    } else if (type == "delete" && !isDeleting) {
      setIsDeleting(true);
      dispatch({ type: "DELETE_ITEM", payload: contact.id });
      setConfirm(false);
    }
  };

  const noHandler = () => {
    setConfirm(false);
  };

  return (
    <>
      <div className={styles.cover}></div>
      <div className={styles.container}>
        <p className={styles.request}>{message}</p>
        <div className={styles.buttons}>
          <button
            disabled={isDeleting}
            onClick={() => yesHandler(contact, type)}
          >
            {isDeleting ? "در حال حذف" : "بله"}
          </button>
          <button onClick={noHandler}>خیر</button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
