import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import withOrganizations, {
  WithOrganizationsProps
} from "../../data/with-organizations";
import * as queries from "../../generated";
import OrganizationForm from "./_form";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  users: Yup.array().min(1, "Pick at least 1 user").required("required"),
});

const AddOrganization = ({
  addOrganization,
}: WithOrganizationsProps) => {
  const initialValues: queries.Organization = {
    name: "",
    users: [],
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await addOrganization({
          variables: values,
        });
        actions.resetForm();
      }}
    >
      {(props) => (<OrganizationForm action='add' {...props} />)}
    </Formik>
  );
};

export default withOrganizations(AddOrganization);
