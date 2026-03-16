import validator from "validator"
import isEmpty from "./is-empty"

export default (value: { name: string; email: string; password: string; confirmPassword: string }) => {
  let errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

  value.name = !isEmpty(value.name) ? value.name : "";
  value.email = !isEmpty(value.email) ? value.email : "";
  value.password = !isEmpty(value.password) ? value.password : "";
  value.confirmPassword = !isEmpty(value.confirmPassword) ? value.confirmPassword : "";

  if(!validator.isLength(value.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (validator.isEmpty(value.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(value.email)) {
    errors.email = "Invalid email format";
  }
  
  if (validator.isEmpty(value.email)) {
    errors.email = "Email is required";
  }

  if(!validator.isLength(value.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(value.password)) {
    errors.password = "Password is required";
  }

  if(validator.isEmpty(value.confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  }

  if(!validator.equals(value.password, value.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}