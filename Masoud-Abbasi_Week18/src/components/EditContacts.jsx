import { useState } from "react";
import styles from "./editContacts.module.css";
import { useFormik } from "formik";
import useContacts from "../context/useContacts.jsx";
import Confirm from "./Confirm.jsx";
import { validationSchema } from "../Helper/validationSchema.js";

function EditContacts() {
	const { contacts, addContacts, selectContacts, currentContact, dispatch } =
	useContacts();
	const [confirm, setConfirm] = useState(false);
  const formik = useFormik({
    initialValues: {
			name: currentContact.name,
			lastName: currentContact.lastName,
			email: currentContact.email,
			mobile: currentContact.mobile,
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });


  const editHandler = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) setConfirm(true);
  };

  const onConfirm = () => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: { id: currentContact.id, data: formik.values },
    });
    setConfirm(false);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { userAction: "مخاطب با موفقیت ویرایش شد!", status: true },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { userAction: "", status: false },
      });
    }, 3000);
  };

  return (
    <>
      <div
        className={styles.cover}
        onClick={() => dispatch({ type: "CHANGE_EDIT_SHOW" })}
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
        <button className={styles.addButton} onClick={editHandler}>
          ویرایش کردن
        </button>
      </div>
      {confirm && (
        <Confirm
          setConfirm={setConfirm}
          onConfirm={onConfirm}
          contact={formik.values}
          type="آیا مخاطب ویرایش شود؟"
        />
      )}
    </>
  );
}

export default EditContacts;
