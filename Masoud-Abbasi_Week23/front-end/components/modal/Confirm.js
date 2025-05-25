import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import styles from "./Confirm.module.css";
import { useDeleteProduct } from "@/hooks/useDeleteProduct.js";

function Confirm() {
  const queryClient = useQueryClient();

  const { selectProduct, dispatch, mutation } = useDeleteProduct();

  const yesHandler = () => {
    mutation.mutate(selectProduct, {
      onSuccess: () => {
        toast.success("کالا با موفقیت حذف شد!");
        dispatch({ type: "CHANGE_CONFIRM" });
        dispatch({ type: "SELECT_PRODUCT", payload: "" });
        queryClient.invalidateQueries({
          queryKey: ["products"],
          exact: false,
        });
      },
      onError: () => {
        toast.error("خطایی رخ داد! مجدد تلاش کنید");
        dispatch({ type: "CHANGE_CONFIRM" });
        dispatch({ type: "SELECT_PRODUCT", payload: "" });
      },
    });
  };

  const noHandler = () => {
    dispatch({ type: "CHANGE_CONFIRM" });
    dispatch({ type: "SELECT_PRODUCT", payload: "" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img
          className={styles.img}
          src="/img/confirm-delete.svg"
          alt="Confirm Icon"
        />
        <p className={styles.message}>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.button}>
          <button className={styles.confirm} onClick={yesHandler}>
            حذف
          </button>
          <button className={styles.noConfirm} onClick={noHandler}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
