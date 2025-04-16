import { useState } from "react";
import styles from "./AddContacts.module.css";
import { useContacts } from "../context/ContactsProvider.jsx";
import AddConfirm from "../components/AddConfirm.jsx";

function AddContacts() {
  const [contact, setContact] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const {
    contacts,
    addContacts,
    selectContacts,
    showAddConfirm,
    showDeleteConfirm,
    dispatch,
  } = useContacts();

  const changeHandler = (e) => {
    setContact((contact) => ({ ...contact, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        className={styles.cover}
        onClick={() => dispatch({ type: "CHANGE_ADD_SHOW" })}
      ></div>
      <div className={styles.container}>
        <h2>اضافه کردن مخاطب</h2>
        <div>
          <label htmlFor="name">نام:</label>
          <input
            name="name"
            value={contact.name}
            className={styles.name}
            id="name"
            type="text"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="lastName">نام خانوادگی:</label>
          <input
            name="lastName"
            value={contact.lastName}
            className={styles.lastName}
            id="lastName"
            type="text"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">ایمیل:</label>
          <input
            name="email"
            value={contact.email}
            className={styles.email}
            id="email"
            type="email"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="mobile">موبایل</label>
          <input
            name="mobile"
            value={contact.mobile}
            className={styles.mobile}
            id="mobile"
            type="number"
            onChange={changeHandler}
          />
        </div>
        <button
          className={styles.addButton}
          onClick={() => {
            dispatch({ type: "CHANGE_ADD_CONFIRM" });
          }}
        >
          اضافه کردن
        </button>
        {showAddConfirm && <AddConfirm contact={contact} />}
      </div>
    </>
  );
}

export default AddContacts;
