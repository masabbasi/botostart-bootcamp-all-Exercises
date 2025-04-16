import React, { useState } from "react";
import { useContacts } from "../context/ContactsProvider.jsx";

function ListItem({ contact }) {
  const [manage, setManage] = useState(false);
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
      <tr>
        <td>{contact.name}</td>
        <td>{contact.lastname}</td>
        <td>{contact.email}</td>
        <td>{contact.mobile}</td>
        <td>
          <div>
            {manage ? (
              <>
                <button>edit</button>
                <button onClick={()=>dispatch({type:"DELETE_ITEM",payload:contact.id})}>delete</button>
              </>
            ) : (
              <button onClick={() => setManage(true)}>"Edit"</button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export default ListItem;
