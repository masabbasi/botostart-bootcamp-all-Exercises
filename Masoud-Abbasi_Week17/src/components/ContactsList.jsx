import useContacts from "../context/useContacts.jsx";

import styles from "./ContactsList.module.css";
import ListItem from "./ListItem.jsx";

function ContactsList() {
  const { contacts, searchContacts } = useContacts();

  if (searchContacts.length > 0) {
    return (
      <>
        <div className={styles.container}>
          {searchContacts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>ایمیل</th>
                  <th>موبایل</th>
                  <th>تغییرات</th>
                </tr>
              </thead>
              <tbody>
                {searchContacts?.length > 0 &&
                  searchContacts.map((contact) => (
                    <ListItem key={contact.id} contact={contact} />
                  ))}
              </tbody>
            </table>
          ) : (
            <p>مخاطبی وجود ندارد!</p>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {contacts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>ایمیل</th>
                <th>موبایل</th>
                <th>تغییرات</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.length > 0 &&
                contacts.map((contact) => (
                  <ListItem key={contact.id} contact={contact} />
                ))}
            </tbody>
          </table>
        ) : (
          <p>مخاطبی وجود ندارد!</p>
        )}
      </div>
    </>
  );
}

export default ContactsList;
