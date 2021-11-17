import { useState } from "react";
import { OrganizationProvider } from "../../data/organizations-context";
import { Organization } from "../../generated";
import AddOrganization from "./add";
import ListOrganization from "./list";

const OrganizationIndex = () => {
  const [setFormOrganization] = useState<Organization>();

  return (
    <OrganizationProvider>
      <ListOrganization setFormOrganization={setFormOrganization} />
      <AddOrganization />
    </OrganizationProvider>
  );
};

export default OrganizationIndex;
