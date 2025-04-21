import styles from "./App.module.css";

import useContacts from "./context/useContacts.jsx";
import ContactActions from "./components/ContactActions.jsx";
import ContactsList from "./components/ContactsList.jsx";
import AddContacts from "./components/AddContacts.jsx";
import EditContacts from "./components/editContacts.jsx";
import Notification from "./components/Notification.jsx";
import { useEffect } from "react";

function App() {
  const { addContacts, editContacts, notification } = useContacts();

  return (
    <>
      {notification?.status && <Notification userAction={notification.userAction} />}
      <ContactActions />
      <ContactsList />
      {addContacts && <AddContacts />}
      {editContacts && <EditContacts />}
    </>
  );
}

export default App;
