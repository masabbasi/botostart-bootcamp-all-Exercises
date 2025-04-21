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
		notification,
    dispatch,
  };
};

export default useContacts;
