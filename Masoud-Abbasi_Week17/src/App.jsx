import styles from "./App.module.css";

import { useContacts } from "./context/ContactsProvider.jsx";
import ContactActions from "./components/ContactActions.jsx";
import ContactsList from "./components/ContactsList.jsx";
import AddContacts from "./components/addContacts.jsx";

function App() {
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
      <ContactActions />
      <ContactsList />
      {addContacts && <AddContacts />}
    </>
  );
}

export default App;
