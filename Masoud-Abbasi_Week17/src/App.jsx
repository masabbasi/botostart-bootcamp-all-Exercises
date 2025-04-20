import styles from "./App.module.css";

import useContacts from "./context/useContacts.jsx";
import ContactActions from "./components/ContactActions.jsx";
import ContactsList from "./components/ContactsList.jsx";
import AddContacts from "./components/AddContacts.jsx";
import EditContacts from "./components/editContacts.jsx";

function App() {
  const { addContacts, editContacts } = useContacts();

  return (
    <>
      <ContactActions />
      <ContactsList />
      {addContacts && <AddContacts />}
      {editContacts && <EditContacts />}
    </>
  );
}

export default App;
