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

//Extend WithOrgainzationsProps interface for props
interface EditOrganizationProps extends WithOrganizationsProps {
  organization: queries.Organization;
  setFormOrganization: (organization: queries.Organization | null) => any;
}

const EditOrganization = ({
  updateOrganization,
  setFormOrganization,
  organization,
}: EditOrganizationProps) => {
  const users = organization?.users?.map((u) => u?.id);

  const handleReset = () => {
    setFormOrganization(null);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...organization, users }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await updateOrganization({
          variables: values,
        });
        setFormOrganization(null);
      }}
    >
      {(props) => (
        <OrganizationForm
          action="update"
          {...props}
          handleReset={handleReset}
        />
      )}
    </Formik>
  );
};

export default withOrganizations(EditOrganization);
