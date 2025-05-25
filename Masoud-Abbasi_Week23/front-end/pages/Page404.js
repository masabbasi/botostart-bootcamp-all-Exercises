import { Link } from "react-router-dom";

import styles from "./Page404.module.css";
import img404 from "../assets/img/404.svg";

function Page404() {
  return (
    <>
      <div className={styles.container}>
				<Link to="/">بازگشت به پنل</Link>
        <img src={img404} alt="404" />
      </div>
    </>
  );
}

export default Page404;
