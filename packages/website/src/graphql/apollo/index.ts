import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "apollo-link-error";
import fetch from "cross-fetch";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const link = createHttpLink({
  uri: "http://localhost:7300/graphql",
  credentials: "",
  fetch,
});

const GraphClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([(errorLink as unknown) as ApolloLink, link]),
});

export default GraphClient;
