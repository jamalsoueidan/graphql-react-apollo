import * as React from "react";
import * as queries from "../generated";

export interface WithOrganizationsProps {
  organizations: queries.Organization[];
  deleteOrganization: any;
  addOrganization: any;
  updateOrganization:any;
}

const withOrganizations = (WrappedComponent: any) => {
  return (props: any) => {
    const { data, error, loading } = queries.useOrganizationsQuery();

    const [deleteOrganizationMutation] = queries.useDeleteOrganizationMutation({
      refetchQueries: [queries.OrganizationsDocument, "Organizations"],
    });

    const [addOrganizationMutation] = queries.useAddOrganizationMutation({
      refetchQueries: [queries.OrganizationsDocument, "Organizations"],
    });

    const [updateOrganizationMutation] = queries.useUpdateOrganizationMutation({
      refetchQueries: [queries.OrganizationsDocument, "Organizations"],
    });

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error || !data) {
      return <div>ERROR</div>;
    }

    return (
      <WrappedComponent
        organizations={data.organizations}
        deleteOrganization={(options: any) =>
          deleteOrganizationMutation(options)
        }
        addOrganization={(options: any) => {
          addOrganizationMutation(options);
        }}
        updateOrganization={(options:any) => {
          updateOrganizationMutation(options)
        }}
        {...props}
      />
    );
  };
};

export default withOrganizations;
