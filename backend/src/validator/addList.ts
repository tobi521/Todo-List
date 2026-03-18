import validator from "validator";
import isEmpty from "./isEmpty";

export default (value: { title: string; description: string }) => {
  let errors: { title?: string, description?: string } ={};

  value.title = !isEmpty(value.title) ? value.title : "";
  value.description = !isEmpty(value.description) ? value.description : "";

  if (validator.isEmpty(value.title)) {
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