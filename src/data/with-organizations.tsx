import * as React from "react";
import * as queries from "../generated";

export interface WithOrganizationsProps {
  organizations: queries.Organization[];
  deleteOrganization: any;
}

const withOrganizations = (WrappedComponent: any) => {
  return (props: any) => {
    const { data, error, loading } = queries.useOrganizationsQuery();

    const [deleteOrganizationMutation] = queries.useDeleteOrganizationMutation({
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
        {...props}
      />
    );
  };
};

export default withOrganizations;
