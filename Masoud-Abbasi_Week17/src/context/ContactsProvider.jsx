import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  getContacts,
  addContact,
  deleteContact,
  changeContact,
} from "../services/config.js";

const initialState = {
  contacts: [],
  deleteContacts: [],
  addContacts: false,
  editContacts: false,
  selectContacts: false,
  notification: { userAction: "", status: false },
  currentContact: {},
};

const reducer = (state, action) => {
  if (!action || !action.type) {
    console.error("Invalid action received:", action);
    return state;
  }
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
    case "ADD_CONTACT_FOR_DELETE":
      return {
        ...state,
        deleteContacts: [...state.deleteContacts, action.payload],
      };
    case "REMOVE_CONTACT_FOR_DELETE":
      return {
        ...state,
        deleteContacts: state.deleteContacts.filter(
          (id) => id !== action.payload
        ),
      };
    case "DELETE_ALL_CONTACTS":
      // state.deleteContacts.forEach((contactId) => deleteContact(contactId));
      return {
        ...state,
        deleteContacts: [],
      };
    case "CHANGE_ADD_SHOW":
      return { ...state, addContacts: !state.addContacts };
    case "CHANGE_EDIT_SHOW":
      return {
        ...state,
        editContacts: !state.editContacts,
        currentContact: action.payload,
      };
    case "SELECT_CONTACTS":
      if (!state.selectContacts) {
        state.deleteContacts = [];
      }
      return {
        ...state,
        selectContacts: !state.selectContacts,
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: {
          userAction: action.payload.userAction,
          status: action.payload.status,
        },
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
