import validator from "validator";
import isEmpty from "./isEmpty";

<<<<<<< HEAD
type ErrorProps = {
  title?: string;
  description?: string;
}

=======
>>>>>>> 822c5144d0344f2a5830e37a2a2917e7418a8e73
export default (
  value: { 
    title: string; 
    description: string 
  }
) => {
<<<<<<< HEAD
  let errors: ErrorProps ={};
=======
  let errors: { title?: string, description?: string } ={};
>>>>>>> 822c5144d0344f2a5830e37a2a2917e7418a8e73

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