import { useState } from "react";
import Confirm from "./Confirm.jsx";

function ListItem({ contact }) {
  const [change, setChange] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const changeHandler = (e) => {
    if (e.target.tagName !== "BUTTON") {
      setChange(false);
    }
    if (e.target.tagName === "BUTTON" && e.target.innerText === "Change") {
      setChange(true);
      setTimeout(() => {
        setChange(false);
      }, 3000);
    }
  };

  const deleteHandler = () => {
    setConfirm(true);
  };

  return (
    <>
      <tr onClick={changeHandler}>
        <td>{contact.name}</td>
        <td>{contact.lastname}</td>
        <td>{contact.email}</td>
        <td>{contact.mobile}</td>
        <td>
          <span>
            {change ? (
              <>
                <button>edit</button>
                <button onClick={deleteHandler}>delete</button>
              </>
            ) : (
              <button onClick={changeHandler}>Change</button>
            )}
          </span>
        </td>
      </tr>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          contact={contact}
          type="delete"
          message="آیا مخاطب حذف شود؟"
        />
      )}
    </>
  );
}

export default ListItem;
