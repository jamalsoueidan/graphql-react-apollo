import * as queries from "../../generated";

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
    <>
      <div>
        {data.organizations?.map((organization) => (
          <div key={organization?.id}>
            <p>{organization?.name}</p>
            <p>Users: {organization?.users?.length}</p>
            <button
              onClick={() =>
                organization &&
                deleteOrganizationMutation({
                  variables: { id: organization.id },
                })
              }
            >
              Delete
            </button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default Organization;
