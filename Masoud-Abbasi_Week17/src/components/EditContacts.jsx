import { useState } from "react";
import styles from "./editContacts.module.css";
import useContacts from "../context/useContacts.jsx";
import Confirm from "./Confirm.jsx";

function EditContacts() {
  const [confirm, setConfirm] = useState(false);
  const { contacts, addContacts, selectContacts, currentContact, dispatch } =
    useContacts();
  const [contact, setContact] = useState({
    name: currentContact.name,
    lastName: currentContact.lastName,
    email: currentContact.email,
    mobile: currentContact.mobile,
  });

  const onConfirm = () => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: { id: currentContact.id, data: contact },
    });
    setConfirm(false);
  };

  const changeHandler = (e) => {
    setContact((contact) => ({ ...contact, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        className={styles.cover}
        onClick={() => dispatch({ type: "CHANGE_EDIT_SHOW" })}
      ></div>
      <div className={styles.container}>
        <h2>ویرایش کردن مخاطب</h2>
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
        <button className={styles.addButton} onClick={() => setConfirm(true)}>
          ویرایش کردن
        </button>
      </div>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          onConfirm={onConfirm}
          contact={contact}
          type="ویرایش"
        />
      )}
    </>
  );
}

export default EditContacts;
