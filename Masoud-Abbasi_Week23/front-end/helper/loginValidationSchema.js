import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("نام کاربری را وارد کنید.")
    .min(3, "حداقل سه کاراکتر"),
  password: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "حداقل هشت کاراکتر")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد"
    ),
});
