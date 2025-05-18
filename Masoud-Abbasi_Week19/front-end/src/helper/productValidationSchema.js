import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("نام کالا را وارد کنید.")
    .min(3, "حداقل سه کاراکتر"),
  quantity: yup
    .string()
    .required("تعداد محصول را وارد کنید.")
    .min(0, "تعداد درست را وارد کنید."),
  price: yup
    .number()
    .required("قیمت محصول را وارد کنید.")
    .min(0, "قیمت درست را وارد کنید."),
});
