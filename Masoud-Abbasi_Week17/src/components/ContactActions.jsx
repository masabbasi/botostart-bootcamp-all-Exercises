import { useState } from "react";
import styles from "./ContactActions.module.css";
import useContacts from "../context/useContacts.jsx";
import Confirm from "./Confirm.jsx";

function ContactActions() {
  const [confirm, setConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const { selectContacts, deleteContacts, dispatch } = useContacts();

  const searchHandler = (e) => {
    let query = e.target.value.trim();
    if (query != "") {
      setSearch(e.target.value.trim());
      if (query.length > 2) {
        dispatch({ type: "SEARCH", payload: search });
      }
    } else {
      setSearch("");
      dispatch({ type: "SEARCH", payload: "" });
    }
  };

  const onConfirm = () => {
    deleteContacts.forEach((id) =>
      dispatch({ type: "DELETE_ITEM", payload: id })
    );
    setConfirm(false);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { userAction: "مخاطبین با موفقیت حذف شدند!", status: true },
    });
    dispatch({ type: "DELETE_ALL_CONTACTS" });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "", status: false },
      });
    }, 3000);
  };

  const hideDeleteIcon = (e) => {
    if (selectContacts && e.target.src !== "/img/delete-user.png") {
      dispatch({ type: "SELECT_CONTACTS" });
    }
  };

  return (
    <>
      <div onClick={hideDeleteIcon} className={styles.container}>
        <div className={styles.search}>
          <label htmlFor="search">جستجو:</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={searchHandler}
						placeholder="حداقل 3 کاراکتر"
          />
        </div>
        <div className={styles.buttons}>
          <div>
            {selectContacts ? (
              <img
                src="/img/delete-user.png"
                alt=""
                onClick={() => setConfirm(true)}
              />
            ) : (
              <img
                src="/img/select-users.png"
                alt=""
                onClick={() => dispatch({ type: "SELECT_CONTACTS" })}
              />
            )}
          </div>
          <div onClick={() => dispatch({ type: "CHANGE_ADD_SHOW" })}>
            <img src="/img/add-user.png" alt="" />
          </div>
        </div>
      </div>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          onConfirm={onConfirm}
          contact={{}}
          type="آیا مخاطبین حذف شوند؟"
        />
      )}
    </>
  );
}

export default ContactActions;
