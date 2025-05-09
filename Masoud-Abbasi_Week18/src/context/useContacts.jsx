import { useContext } from "react";
import { ContactsContext } from "./ContactsProvider.jsx";

const useContacts = () => {
  const {
    contactsApp: {
      contacts,
      addContacts,
      editContacts,
      selectContacts,
      notification,
      searchContacts,
      deleteContacts,
      currentContact,
    },
    dispatch,
  } = useContext(ContactsContext);
  return {
    contacts,
    addContacts,
    editContacts,
    selectContacts,
    currentContact,
    deleteContacts,
    searchContacts,
    notification,
    dispatch,
  };
};

export default useContacts;
