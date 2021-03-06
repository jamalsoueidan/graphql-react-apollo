import { Formik } from "formik";
import * as React from "react";
import withOrganizations, {
  WithOrganizationsProps,
} from "../../data/with-organizations";
import * as queries from "../../generated";
import OrganizationForm from "./form/_form";
import validationSchema from "./form/_validation-schema";

/* --------------------------------------------
  This component use the withOrganization
---------------------------------------------- */
const initialValues: queries.Organization = {
  name: "",
  users: [],
};

//Use WithOrgainzationsProps interface for props
const AddOrganization = ({ addOrganization }: WithOrganizationsProps) => {
  return (
    <Formik
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
      {(props) => <OrganizationForm action="add" {...props} />}
    </Formik>
  );
};

export default withOrganizations(AddOrganization);
