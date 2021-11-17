import * as React from 'react'
import * as queries from "../generated";


interface OrganizationsContextProps {
  organizations?: queries.Organization[],
  deleteOrganization?: any;
  addOrganization?: any;
}

const OrganizationStateContext = React.createContext<OrganizationsContextProps>({})

type OrganizationProviderProps = {children: React.ReactNode}

function OrganizationProvider({children}: OrganizationProviderProps) {
  const { data } = queries.useOrganizationsQuery();

  const [deleteOrganizationMutation] = queries.useDeleteOrganizationMutation({
    refetchQueries: [queries.OrganizationsDocument, "Organizations"],
  });

  const [addOrganizationMutation] = queries.useAddOrganizationMutation({
    refetchQueries: [queries.OrganizationsDocument, "Organizations"],
  });

  const value:OrganizationsContextProps = {
    organizations: (data?.organizations as any),
    deleteOrganization: (options: any) => {
      deleteOrganizationMutation(options)
    },
    addOrganization: (options: any) =>  {
      addOrganizationMutation(options)
    }
  }

  return (
    <OrganizationStateContext.Provider value={value}>
      {children}
    </OrganizationStateContext.Provider>
  )
}

function useOrganization() {
  const context = React.useContext(OrganizationStateContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {OrganizationProvider, useOrganization}