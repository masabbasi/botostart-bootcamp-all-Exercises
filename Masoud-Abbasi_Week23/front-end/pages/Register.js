import { useRouter } from "next/router.js";
import Link from "next/link.js";
import { Formik, ErrorMessage, Field } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { registerValidationSchema } from "../helper/registerValidationSchema.js";
import { api } from "../configs/api.js";

import styles from "./login-register.module.css";

function Register() {
  const router = useRouter();
  const registerUser = async (values) => {
    const response = await api.post("/auth/register", values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.message === "User registered successfully") {
        toast.success("ثبت نام با موفقیت انجام شد!");
       router.push("/login")
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
          toast.error("کاربر با این یوزرنیم وجود دارد!");
          resetForm({ username: "", password: "", repassword: "" });
        },
      }
    );
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src="/img/logo.svg" alt="" />
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
        <Link className={styles.link} href="/login">
          حساب کاربری دارید؟
        </Link>
      </div>
    </>
  );
}

export default Register;
