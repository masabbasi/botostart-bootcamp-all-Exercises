import { Formik, ErrorMessage, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import { registerValidationSchema } from "../helper/registerValidationSchema.js";
import { api } from "../configs/api.js";

import styles from "./Login-register.module.css";
import logo from "../assets/img/logo.svg";

function Register() {
  const navigate = useNavigate();
  const registerUser = async (values) => {
    const response = await api.post("/auth/register", values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.message === "User registered successfully") {
        toast.success("ثبت نام با موفقیت انجام شد!", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/login");
      }
    },
  });

  const submitHandler = (values, resetForm) => {
    mutation.mutate(
      {
        username: values.username,
        password: values.password,
      },
      {
        onError: () => {
          toast.error("کاربر با این یوزرنیم وجود دارد!", {
            position: "top-right",
            autoClose: 1500,
          });
          resetForm({ username: "", password: "", repassword: "" });
        },
      }
    );
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="" />
        <h1 className={styles.title}>فرم ثبت نام</h1>
        <Formik
          initialValues={{ username: "", password: "", repassword: "" }}
          validationSchema={registerValidationSchema}
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
              <div>
                <Field
                  type="password"
                  name="repassword"
                  placeholder="تکرار رمز عبور"
                />
                <ErrorMessage
                  name="repassword"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button
                className={styles.button}
                type="submit"
                disabled={mutation.isPending || isSubmitting}
              >
                ثبت نام
              </button>
            </form>
          )}
        </Formik>
        <Link className={styles.link} to="/login">
          حساب کاربری دارید؟
        </Link>
      </div>
    </>
  );
}

export default Register;
