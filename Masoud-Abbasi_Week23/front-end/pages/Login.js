import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Formik, ErrorMessage, Field } from "formik";
import { toast } from "react-toastify";

import { useApp } from "../context/AppProvider";
import { loginValidationSchema } from "../helper/loginValidationSchema.js";
import { api } from "../configs/api.js";
import { setCookie } from "../utils/cookie.js";

import styles from "./login-register.module.css";

function Login() {
  const router = useRouter();
  const { dispatch } = useApp();

  const loginUser = async (values) => {
    const response = await api.post("/auth/login", values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
  });

  const submitHandler = (values, resetForm) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data.token) {
          dispatch({ type: "USER_LOGIN", payload: values.username });
          toast.success("ورود با موفقیت انجام شد!");
          setCookie(data.token);
          router.push("/");
        }
      },
      onError: (response) => {
        if (response.status === 400) {
          toast.error("یوزر نیم یا پسورد اشتباه است!");
        }
        resetForm({ username: "", password: "" });
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src="/img/logo.svg" alt="" />
        <h1 className={styles.title}>فرم ورود</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values, { resetForm }) => {
            submitHandler(values, resetForm);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field type="text" name="username" placeholder="نام کاربری" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <Field type="password" name="password" placeholder="رمز عبور" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button
                type="submit"
                className={styles.button}
                disabled={mutation.isPending || isSubmitting}
              >
                ورود
              </button>
            </form>
          )}
        </Formik>
        <Link className={styles.link} href="/register">
          حساب کاربری ندارید؟
        </Link>
      </div>
    </>
  );
}

export default Login;
