import { useQueryClient } from "@tanstack/react-query";
import { Formik, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";

import { productValidationSchema } from "../../helper/productValidationSchema.js";

import styles from "./Add-edit.module.css";
import { useEditProduct } from "@/hooks/useEditProduct.js";

function Edit() {
  const queryClient = useQueryClient();

  const { mutation, product, dispatch } = useEditProduct();

  const yesHandler = (values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        dispatch({ type: "CHANGE_EDIT" });
        dispatch({ type: "SELECT_PRODUCT", payload: {} });
        toast.success("کالا با موفقیت ویرایش شد!");
      },
      onError: () => {
        toast.error("خطایی رخ داد! مجدد تلاش کنید");
        dispatch({ type: "CHANGE_EDIT" });
        dispatch({ type: "SELECT_PRODUCT", payload: {} });
      },
    });
  };
  const noHandler = () => {
    dispatch({ type: "CHANGE_EDIT" });
    dispatch({ type: "EDIT_PRODUCT", payload: {} });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>ویرایش محصول</h1>
        <Formik
          initialValues={{
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          }}
          validationSchema={productValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values) => yesHandler(values)}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
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
                  ویرایش
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

export default Edit;
