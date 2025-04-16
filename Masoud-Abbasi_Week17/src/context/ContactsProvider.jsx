import React, { createContext, useContext, useEffect, useReducer } from "react";

import { addContact, deleteContact } from "../services/config.js";

import { getContacts } from "../services/config.js";

const initialState = {
  contacts: "",
  addContacts: false,
  selectContacts: false,
  showAddConfirm: false,
  showDeleteConfirm: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      addContact(action.payload);
      return {
        ...state,
        showAddConfirm: !state.showAddConfirm,
        addContacts: !state.addContacts,
      };
    case "CHANGE_ADD_SHOW":
      return { ...state, addContacts: !state.addContacts };
    case "CHANGE_ADD_CONFIRM":
      return { ...state, showAddConfirm: !state.showAddConfirm };
    case "DELETE_ITEM":
      deleteContact(action.payload);
			break;
    default:
      throw new Error("Invalid Action");
  }
};

const ContactsContext = createContext();

function ContactsProvider({ children }) {
  const [contactsApp, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      dispatch({ type: "GET_CONTACTS", payload: data });
    };
    fetchContacts();
  }, [contactsApp]);

  return (
    <ContactsContext.Provider value={{ contactsApp, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

const useContacts = () => {
  const {
    contactsApp: {
      contacts,
      addContacts,
      selectContacts,
      showAddConfirm,
      showDeleteConfirm,
    },
    dispatch,
  } = useContext(ContactsContext);
  return {
    contacts,
    addContacts,
    selectContacts,
    showAddConfirm,
    showDeleteConfirm,
    dispatch,
  };
};

export default ContactsProvider;
export { useContacts };
