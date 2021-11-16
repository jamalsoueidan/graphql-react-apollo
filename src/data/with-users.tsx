import * as React from "react";
import * as queries from "../generated";

export interface WithUsersProps {
  users: queries.User[];
}

const withUsers = (WrappedComponent: any) => {
  return (props: any) => {
    const { data, error, loading } = queries.useUsersQuery();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error || !data) {
      return <div>ERROR</div>;
    }

    return <WrappedComponent users={data.users} {...props} />;
  };
};

export default withUsers;
