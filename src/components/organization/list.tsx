import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import withOrganizations, {
  WithOrganizationsProps,
} from "../../data/with-organizations";
import { Organization } from "../../generated";
import AlertDialog from "./alert";

const ListOrganization = ({
  organizations,
  deleteOrganization,
}: WithOrganizationsProps) => {
  return (
    <List>
      {organizations?.map((organization: Organization) => (
        <ListItem
          key={organization?.id}
          secondaryAction={
            <AlertDialog
              action={() =>
                deleteOrganization({
                  variables: { id: organization?.id },
                })
              }
            />
          }
        >
          <ListItemText
            primary={organization?.name}
            secondary={"Users:" + organization?.users?.length}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default withOrganizations(ListOrganization);
