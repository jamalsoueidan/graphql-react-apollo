import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  default as ListItemButton,
  default as ListItemText
} from "@mui/material/ListItemText";
import * as React from "react";
import { useOrganization } from "../../data/organizations-context";
import { Organization } from "../../generated";
import AlertDialog from "./alert";

/* ---------------------------------------------------------
  This component use the provider context useOrganization()
----------------------------------------------------------- */
interface ListOrganizationProps {
  setFormOrganization: any;
}

const ListOrganization = ({
  setFormOrganization,
}: ListOrganizationProps) => {

  const {organizations, deleteOrganization} = useOrganization();

  return (
    <List dense>
      {organizations?.map((organization: Organization) => (
        <ListItem
          key={organization.id}
          secondaryAction={
            <AlertDialog
              action={() =>
                deleteOrganization({
                  variables: { id: organization.id },
                })
              }
            />
          }
        >
          <ListItemButton onClick={() => setFormOrganization(organization)}>
            <ListItemText
              primary={organization.name}
              secondary={"Users:" + organization.users?.length}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListOrganization;
