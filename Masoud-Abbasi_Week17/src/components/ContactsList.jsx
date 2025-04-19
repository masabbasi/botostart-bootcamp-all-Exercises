import { useContacts } from "../context/ContactsProvider.jsx";

import styles from "./ContactsList.module.css";
import ListItem from "./ListItem.jsx";

function ContactsList() {
  const { contacts } = useContacts();

  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>ایمیل</th>
            <th>موبایل</th>
            <th>مدیریت</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.length > 0 &&
            contacts.map((contact) => (
              <ListItem key={contact.id} contact={contact} />
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ContactsList;
