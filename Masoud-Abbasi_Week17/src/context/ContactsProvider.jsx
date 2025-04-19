import React, { createContext, useContext, useEffect, useReducer } from "react";

import { addContact, deleteContact } from "../services/config.js";

import { getContacts } from "../services/config.js";

const initialState = {
  contacts: [],
  addContacts: false,
  selectContacts: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      addContact(action.payload);
      return {
        ...state,
        addContacts: !state.addContacts,
      };
    case "DELETE_ITEM":
      console.log("Start delete");
      deleteContact(action.payload);
      break;
    case "CHANGE_ADD_SHOW":
      return { ...state, addContacts: !state.addContacts };
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
  }, []);

  return (
    <ContactsContext.Provider value={{ contactsApp, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

const useContacts = () => {
  const {
    contactsApp: { contacts, addContacts, selectContacts },
    dispatch,
  } = useContext(ContactsContext);
  return {
    contacts,
    addContacts,
    selectContacts,
    dispatch,
  };
};

export default ContactsProvider;
export { useContacts };
