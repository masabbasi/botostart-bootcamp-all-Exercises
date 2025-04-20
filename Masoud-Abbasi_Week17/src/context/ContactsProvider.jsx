import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  getContacts,
  addContact,
  deleteContact,
  changeContact,
} from "../services/config.js";

const initialState = {
  contacts: [],
  addContacts: false,
  editContacts: false,
  selectContacts: false,
  currentContact: {},
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
    case "EDIT_CONTACT":
      changeContact(action.payload);
      return {
        ...state,
        editContacts: !state.editContacts,
        currentContact: {},
      };
    case "DELETE_ITEM":
      deleteContact(action.payload);
      return { ...state };
    case "CHANGE_ADD_SHOW":
      return { ...state, addContacts: !state.addContacts };
    case "CHANGE_EDIT_SHOW":
      return {
        ...state,
        editContacts: !state.editContacts,
        currentContact: action.payload,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export const ContactsContext = createContext();

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

export default ContactsProvider;
