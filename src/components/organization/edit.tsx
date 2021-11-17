import { Formik } from "formik";
import * as React from "react";
import withOrganizations, {
  WithOrganizationsProps
} from "../../data/with-organizations";
import * as queries from "../../generated";
import OrganizationForm from "./form/_form";
import validationSchema from "./form/_validation-schema";

/* --------------------------------------------
  This component use the withOrganization
---------------------------------------------- */

interface EditOrganizationProps extends WithOrganizationsProps{
  organization:queries.Organization
}

const EditOrganization = ({
  updateOrganization,
  organization
}: EditOrganizationProps) => {

  return (
    <Formik
      enableReinitialize={true}
      initialValues={organization}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await updateOrganization({
          variables: values,
        });
        actions.resetForm();
      }}
    >
      {(props) => (<OrganizationForm action='update' {...props} />)}
    </Formik>
  );
};

export default withOrganizations(EditOrganization);
