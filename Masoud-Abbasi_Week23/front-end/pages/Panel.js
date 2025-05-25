import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";

import { api } from "../configs/api.js";
import { useApp } from "../context/appProvider.jsx";

import ProductItem from "../component/ProductItem.jsx";
import Confirm from "../modal/Confirm.jsx";
import Add from "../modal/Add.jsx";
import Edit from "../modal/Edit.jsx";

import styles from "./Panel.module.css";
import searchIcon from "../assets/img/search.svg";
import userImage from "../assets/img/user.png";
import ProductManagement from "../assets/img/Product Management.svg";
import notFound from "../assets/img/not-found.png";

function Panel() {
  const {
    state: { confirmModal, addModal, editModal, userLogin },
    dispatch,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async ({ queryKey }) => {
    const [, searchQuery, page] = queryKey;
    const response = await api.get(
      `/products?page=${page}&limit=5&name=${searchQuery}`
    );
    return response;
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products", searchQuery, page],
    queryFn: fetchProducts,
    retry: 1,
  });

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
          <img src={searchIcon} alt="" />
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
            <img src={userImage} alt="user Image" />
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
          <img src={ProductManagement} alt="Product Management Icon" />
          <span>مدیریت کالا</span>
        </div>
        <div className={styles.addProduct}>
          <div onClick={() => dispatch({ type: "CHANGE_ADD" })}>
            افزودن محصول
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <table>
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
              data?.data.map((product) => (
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
                <img src={notFound} alt="not found" />
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
      {editModal && <Edit />}{" "}
    </div>
  );
}

export default Panel;
