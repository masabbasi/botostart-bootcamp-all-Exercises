import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('لطفا نام را وارد کنید!')
    .min(3, 'نام باید حداقل 3 کاراکتر باشد'),
  
  lastName: Yup.string()
    .required('لطفا نام خانوادگی را وارد کنید!')
    .min(3, 'نام خانوادگی باید حداقل 3 کاراکتر باشد'),
  
  email: Yup.string()
    .required('لطفا ایمیل را وارد کنید!')
    .email('ایمیل واردشده معتبر نیست'),
  
  mobile: Yup.string()
    .required('لطفا موبایل را وارد کنید')
    .matches(/^09\d{9}$/, 'موبایل باید ۱۱ رقم باشد و با 09 شروع شود!')
});