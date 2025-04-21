import styles from "./Confirm.module.css";

function Confirm({ contact, type, setConfirm, onConfirm, process }) {
  const noHandler = () => {
    setConfirm(false);
  };

  return (
    <>
      <div className={styles.cover}></div>
      <div className={styles.container}>
        <p className={styles.request}>{type}</p>
        <div className={styles.buttons}>
          <button disabled={process} onClick={() => onConfirm()}>
            {process ? `در حال انجام...` : "بله"}
          </button>
          <button onClick={noHandler}>خیر</button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
