import { useState } from "react";
import { useContacts } from "../context/ContactsProvider.jsx";

import styles from "./ContactsList.module.css";
import ListItem from "./ListItem.jsx";

function ContactsList() {
  const {
    contacts,
    addContacts,
    selectContacts,
    showAddConfirm,
    showDeleteConfirm,
    dispatch,
  } = useContacts();

  return (
    <>
      <table className={styles.container}>
        <tr>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>ایمیل</th>
          <th>موبایل</th>
          <th>مدیریت</th>
        </tr>
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <ListItem contact={contact}/>
          ))}
      </table>
    </>
  );
}

export default ContactsList;
