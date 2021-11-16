import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as queries from "../../generated";
import AlertDialog from "./alert";

const ListOrganization = () => {
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
          <ListItemText
            primary={organization?.name}
            secondary={"Users:" + organization?.users?.length}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListOrganization;
