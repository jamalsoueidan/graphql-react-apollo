import { useState } from "react";
import { OrganizationProvider } from "../../data/organizations-context";
import { Organization } from "../../generated";
import AddOrganization from "./add";
import EditOrganization from "./edit";
import ListOrganization from "./list";

const OrganizationIndex = () => {
  const [organization, setFormOrganization] = useState<Organization>();

  const form = organization ? <EditOrganization organization={organization} /> : <AddOrganization />

  return (
    <OrganizationProvider>
      <ListOrganization setFormOrganization={setFormOrganization} />
      {form}
    </OrganizationProvider>
  );
};

export default OrganizationIndex;
