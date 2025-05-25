import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";

import { useApp } from "../context/appProvider";
import { productValidationSchema } from "../helper/productValidationSchema.js";
import { api } from "../configs/api.js";

import styles from "./Add-edit.module.css";

function Add() {
  const { dispatch } = useApp();
  const queryClient = useQueryClient();

  const addProduct = async (values) => {
    const response = await api.post("/products", values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: addProduct,
  });

  const yesHandler = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success("کالا با موفقیت اضافه شد!");
        queryClient.invalidateQueries({ queryKey: ["products"] });
        dispatch({ type: "CHANGE_ADD" });
      },
      onError: () => {
        toast.error("خطایی رخ داد! مجدد تلاش کنید");
        dispatch({ type: "CHANGE_ADD" });
      },
    });
  };

  const noHandler = () => {
    dispatch({ type: "CHANGE_ADD" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>ایجاد محصول جدید</h1>
        <Formik
          initialValues={{ name: "", price: "", quantity: "" }}
          validationSchema={productValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) => yesHandler(values)}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <span className={styles.label}>نام کالا</span>
                <Field type="text" name="name" placeholder="نام کالا" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <span className={styles.label}>تعداد موجودی</span>
                <Field type="number" name="quantity" placeholder="تعداد" />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <span className={styles.label}>قیمت</span>
                <Field type="number" name="price" placeholder="قیمت" />
                <ErrorMessage
                  name="price"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.button}>
                <button
                  className={styles.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  ایجاد
                </button>
                <button onClick={noHandler}>انصراف</button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Add;
