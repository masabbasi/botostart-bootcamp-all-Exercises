import { useState } from "react";
import styles from "./ContactActions.module.css";
import { useContacts } from "../context/ContactsProvider";

function ContactActions() {
  const [search, setSearch] = useState("");
  const {
    contacts,
    addContacts,
    selectContacts,
    showAddConfirm,
    showDeleteConfirm,
    dispatch,
  } = useContacts();

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <label htmlFor="search">جستجو در مخاطبین:</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.trim())}
        />
      </div>
      <div className={styles.buttons}>
        <div onClick={() => dispatch()}>
          <img src="/img/select-users.png" alt="" />
        </div>
        <div onClick={() => dispatch({ type: "CHANGE_ADD_SHOW" })}>
          <img src="/img/add-user.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ContactActions;
