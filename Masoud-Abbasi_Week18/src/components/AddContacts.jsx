import { useState } from "react";
import { useFormik } from "formik";
import styles from "./AddContacts.module.css";
import useContacts from "../context/useContacts.jsx";
import Confirm from "./Confirm.jsx";
import Notification from "./Notification.jsx";
import { validationSchema } from "../Helper/validationSchema.js";

function AddContacts() {
  const { contacts, addContacts, selectContacts, dispatch } = useContacts();

  const [confirm, setConfirm] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      mobile: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const onConfirm = () => {
    dispatch({ type: "ADD_CONTACT", payload: formik.values });
    setConfirm(false);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { userAction: "مخاطب با موفقیت اضافه شد!", status: true },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { type: "", status: false },
      });
    }, 3000);
  };

  const addHandler = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) setConfirm(true);
  };
  return (
    <>
      <div
        className={styles.cover}
        onClick={() => dispatch({ type: "CHANGE_ADD_SHOW" })}
      ></div>
      <div className={styles.container}>
        <h2>اضافه کردن مخاطب</h2>
        <div>
          <label htmlFor="name">نام:</label>
          <input
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.name}
            id="name"
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <div className={styles.errors}>{formik.errors.name}</div>
        )}
        <div>
          <label htmlFor="lastName">نام خانوادگی:</label>
          <input
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.lastName}
            id="lastName"
          />
        </div>
        {formik.touched.lastName && formik.errors.lastName && (
          <div className={styles.errors}>{formik.errors.lastName}</div>
        )}
        <div>
          <label htmlFor="email">ایمیل:</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.email}
            id="email"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className={styles.errors}>{formik.errors.email}</div>
        )}
        <div>
          <label htmlFor="mobile">موبایل</label>
          <input
            name="mobile"
            type="text"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.mobile}
            id="mobile"
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile && (
          <div className={styles.errors}>{formik.errors.mobile}</div>
        )}
        <button className={styles.addButton} onClick={addHandler}>
          اضافه کردن
        </button>
      </div>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          onConfirm={onConfirm}
          contact={formik.values}
          type="آیا مخاطب اضافه شود؟"
        />
      )}
    </>
  );
}

export default AddContacts;
