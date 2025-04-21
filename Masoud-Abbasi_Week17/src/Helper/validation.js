export const validation = ({ name, lastName, email, mobile }) => {
  const errors = {};

  if (!name || name.trim() === "") {
    errors.name = "لطفا نام را وارد کنید!";
  } else if (name.length < 3) {
    errors.name = "نام باید حداقل 3 کاراکتر باشد";
  }

  if (!lastName || lastName.trim() === "") {
    errors.lastName = "لطفا نام خانوادگی را وارد کنید!";
  } else if (lastName.length < 3) {
    errors.lastName = "نام خانوادگی باید حداقل 3 کاراکتر باشد";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim() === "") {
    errors.email = "لطفا ایمیل را وارد کنید!";
  } else if (!emailRegex.test(email)) {
    errors.email = "ایمیل واردشده معتبر نیست";
  }

  const mobileRegex = /^09\d{9}$/;
  if (!mobile || mobile.trim() === "") {
    errors.mobile = "لطفا موبایل را وارد کنید";
  } else if (!mobileRegex.test(mobile)) {
    errors.mobile = "موبایل باید ۱۱ رقم باشد و با 09 شروع شود!";
  }

  return Object.keys(errors).length === 0 ? true : errors;
};
