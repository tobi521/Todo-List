import validator from "validator";
import isEmpty from "./is-empty";

export default (value: { title: string; description: string }) => {
  let errors = { title: "", description: "" };

  value.title = !isEmpty(value.title) ? value.title : "";
  value.description = !isEmpty(value.description) ? value.description : "";

  if (!validator.isEmail(value.title)) {
    errors.title = "Title is required";
  }

  if (validator.isEmpty(value.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}