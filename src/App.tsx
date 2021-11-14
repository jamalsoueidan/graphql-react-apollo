import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Organization from './components/organization';

// Initialize ApolloClient
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000',
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Organization />
    </ApolloProvider>
  )
}

export default App