import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";

import { useApp } from "../context/AppProvider.js";

import ProductItem from "../components/ProductItem.js";
import Confirm from "../components/modal/Confirm.js";
import Add from "../components/modal/Add.js";
import Edit from "../components/modal/Edit.js";

import styles from "./panel.module.css";
import { useRouter } from "next/router.js";
import { useProducts } from "@/hooks/useProducts.js";

function Panel() {
  const router = useRouter();
  const {
    state: { confirmModal, addModal, editModal, userLogin, isAuthenticated },
    dispatch,
  } = useApp();

  if (!isAuthenticated) {
    router.push("/login");
  }

  const {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    data,
    isSuccess,
    isLoading,
  } = useProducts();

  const exitHandler = () => {
    toast.success("با موفقیت خارج شدید!");
    dispatch({ type: "EXIT" });
  };

  const searchHandler = (e) => {
    const querye = e.target.value.toLowerCase();
    setSearchQuery(querye);
  };

  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= data?.totalPages) return;
    setPage((page) => page + 1);
  };

  const pageHandler = (pageNumber) => {
    if (pageNumber !== page && pageNumber <= data?.totalPages) {
      setPage(pageNumber);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <img src="/img/search.svg" alt="" />
          <input
            onChange={searchHandler}
            name="search"
            type="text"
            value={searchQuery}
            placeholder="جستجوی کالا"
          />
        </div>
        <div className={styles.user}>
          <div className={styles.userImage}>
            <img src="/img/user.png" alt="user Image" />
          </div>
          <div className={styles.userDetail}>
            <span className={styles.userName}>{userLogin}</span>
            <span className={styles.userPosition}>مدیر</span>
            <span onClick={exitHandler} className={styles.exit}>
              خروج
            </span>
          </div>
        </div>
      </div>
      <div className={styles.productManagement}>
        <div className={styles.productManagementTitle}>
          <img src="/img/Product Management.svg" />
        </div>
        <div className={styles.addProduct}>
          <div onClick={() => dispatch({ type: "CHANGE_ADD" })}>
            افزودن محصول
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th>تغییرات</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess ? (
              data?.data?.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : isLoading ? (
              <div className={styles.loader}>
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#306cce", "#72a1ed"]}
                />
              </div>
            ) : (
              <div className={styles.notFound}>
                <img src="img/not-found.png" alt="not found" />
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button onClick={previousHandler}>قبلی</button>
        <p
          onClick={() => pageHandler(1)}
          className={page === 1 ? styles.active : ""}
        >
          1
        </p>
        <span>...</span>
        {page > 1 && page < data?.totalPages && (
          <>
            <p className={styles.active}>{page}</p> <span>...</span>
          </>
        )}
        <p
          onClick={() => pageHandler(data?.totalPages)}
          className={page === data?.totalPages ? styles.active : ""}
        >
          {data?.totalPages}
        </p>
        <button onClick={nextHandler}>بعدی</button>
      </div>
      {confirmModal && <Confirm />}
      {addModal && <Add />}
      {editModal && <Edit />}
    </div>
  );
}

export default Panel;
