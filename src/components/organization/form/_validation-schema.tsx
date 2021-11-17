import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  users: Yup.array().min(1, "Pick at least 1 user").required("required"),
});

export default validationSchema