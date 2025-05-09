import React from "react";
import styles from "./Notification.module.css";

function Notification({userAction}) {
  return (
    <>
      <div className={styles.container}>
        <p>{userAction}</p>
        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>
      </div>
    </>
  );
}

export default Notification;
