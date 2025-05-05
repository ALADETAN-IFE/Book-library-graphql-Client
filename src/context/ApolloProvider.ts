import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";

const client = new ApolloClient({
  uri:  import.meta.env.VITE_SERVER_URL,
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return (<Provider client={client}>{children}</Provider>);
};

export default ApolloProvider;
