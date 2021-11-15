import FolderIcon from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as queries from "../../generated";
import AlertDialog from "./alert";

const Organization = () => {
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
    <List>
      {data.organizations?.map((organization) => (
        <ListItem
          key={organization?.id}
          secondaryAction={
            <AlertDialog
              action={() =>
                deleteOrganizationMutation({
                  variables: { id: organization?.id },
                })
              }
            />
          }
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={organization?.name}
            secondary={"Users:" + organization?.users?.length}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Organization;
