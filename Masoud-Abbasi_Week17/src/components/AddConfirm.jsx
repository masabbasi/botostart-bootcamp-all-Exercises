import React from "react";
import { useContacts } from "../context/ContactsProvider";
import styles from "./AddConfirm.module.css";

function AddConfirm({ contact }) {
  const {
    contacts,
    addContacts,
    selectContacts,
    showAddConfirm,
    showDeleteConfirm,
    dispatch,
  } = useContacts();

  const addContactsHandler = () => {
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  return (
    <div className={styles.container}>
      <p className={styles.request}>حذف شود؟</p>
      <div className={styles.buttons}>
        <button onClick={addContactsHandler}>بله</button>
        <button onClick={() => dispatch({ type: "CHANGE_ADD_CONFIRM" })}>
          خیر
        </button>
      </div>
    </div>
  );
}

export default AddConfirm;
