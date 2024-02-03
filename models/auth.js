import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  phoneno: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().required("Enter Your Email"),
});
