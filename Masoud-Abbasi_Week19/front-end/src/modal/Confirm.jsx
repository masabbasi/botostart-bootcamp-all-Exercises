import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useApp } from "../context/appProvider";
import { api } from "../configs/api.js";

import styles from "./Confirm.module.css";
import confirmIcon from "../assets/img/confirm-delete.svg";

function Confirm() {
  const queryClient = useQueryClient();

  const {
    state: { selectProduct },
    dispatch,
  } = useApp();

  const deleteProduct = async () => {
    const response = await api.delete(`/products/${selectProduct}`);
    return response;
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
  });

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
        <img className={styles.img} src={confirmIcon} alt="Confirm Icon" />
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
