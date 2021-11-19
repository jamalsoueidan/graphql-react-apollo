# Getting Started with Graphql + React + Apollo

I try to demostrate context + hoc in different use cases.

Context is used in the [organization/list.tsx](https://github.com/jamalsoueidan/graphql-react-apollo/blob/Main/src/components/organization/list.tsx) [useOrganization](https://github.com/jamalsoueidan/graphql-react-apollo/blob/Main/src/data/organizations-context.tsx)

- Global shared state.
- When you want to share data between all nested components.

HOC is used in the [organization/add.tsx](https://github.com/jamalsoueidan/graphql-react-apollo/blob/Main/src/components/organization/add.tsx) [withOrganizations](https://github.com/jamalsoueidan/graphql-react-apollo/blob/Main/src/data/with-organizations.tsx)

- When you don't want to share data with all nested children.
- When you want to pick the component which receives the props.
- It will act as local storage for the specific component.

# References

[how-to-use-react-context-effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

[a-simple-graphql-example-with-relationships/](https://blog.tylerbuchea.com/a-simple-graphql-example-with-relationships/)

# Screenshot

![alt text](https://github.com/jamalsoueidan/graphql-react-apollo/blob/Main/screenshot.png?raw=true)
