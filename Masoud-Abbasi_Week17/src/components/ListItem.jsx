import { useState } from "react";
import Confirm from "./Confirm.jsx";
import useContacts from "../context/useContacts.jsx";
import styles from "./ListItem.module.css";

function ListItem({ contact }) {
  const [change, setChange] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [process, setProcess] = useState(false);
  const { dispatch, selectContacts } = useContacts();

  const onConfirm = () => {
    setProcess(true);
    dispatch({ type: "DELETE_ITEM", payload: contact.id });
    setConfirm(false);
  };

  const changeHandler = (e) => {
    if (e.target.tagName !== "BUTTON") {
      setChange(false);
    }
    if (e.target.tagName === "BUTTON" && e.target.innerText === "تغییر") {
      setChange(true);
      setTimeout(() => {
        setChange(false);
      }, 3000);
    }
  };

  const deleteHandler = () => {
    setConfirm(true);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { userAction: "مخاطب با موفقیت حذف شد!", status: true },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "", status: false },
      });
    }, 3000);
  };

  const editHandler = (contact) => {
    dispatch({ type: "CHANGE_EDIT_SHOW", payload: contact });
  };

  const checkBoxHandler = (e, id) => {
    if (e.target.checked) {
      dispatch({ type: "ADD_CONTACT_FOR_DELETE", payload: id });
    } else {
			dispatch({ type: "REMOVE_CONTACT_FOR_DELETE", payload: id });
		}
  };

  return (
    <>
      <tr onClick={changeHandler}>
        <td>{contact.name}</td>
        <td>{contact.lastName}</td>
        <td>{contact.email}</td>
        <td>{contact.mobile}</td>
        <td>
          <span className={styles.changeButton}>
            {selectContacts ? (
              <input
                type="checkbox"
                onClick={(e) => checkBoxHandler(e, contact.id)}
              />
            ) : change ? (
              <>
                <button
                  className={styles.editButton}
                  onClick={() => editHandler(contact)}
                >
                  ویرایش
                </button>
                <button className={styles.deleteButton} onClick={deleteHandler}>
                  حذف
                </button>
              </>
            ) : (
              <button onClick={changeHandler}>تغییر</button>
            )}
          </span>
        </td>
      </tr>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          onConfirm={onConfirm}
          contact={contact}
          type="آیا مخاطب حذف شود؟"
          process={process}
        />
      )}
    </>
  );
}

export default ListItem;
