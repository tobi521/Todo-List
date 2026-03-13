import validator from "validator"
import isEmpty from "./is-empty"

export default (value: { email: string; password: string }) => {
  let errors: { email?: string; password?: string } = {};

  value.email = !isEmpty(value.email) ? value.email : "";
  value.password = !isEmpty(value.password) ? value.password : "";

  if (!validator.isEmail(value.email)) {
    errors.email = "Invalid email format";
  }

  if (validator.isEmpty(value.password)) {
    errors.password = "Password is required";
  }

  if(validator.isLength(value.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}