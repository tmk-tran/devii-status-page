import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// HTTP link for API endpoint
const httpLink = new HttpLink({ uri: baseUrl });

// Auth link to attach token to each request
const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("access_token"); // read token per request

  return {
    headers: {
      ...prevContext.headers, // keep existing headers

      Authorization: token ? `Bearer ${token}` : "", // attach auth token
    },
  };
});

// Dynamic endpoint routing link
const dynamicUriLink = new ApolloLink((operation, forward) => {
  const context = operation.getContext();

  // pick endpoint based on context value
  let endpoint = "/query"; // default

  if (context.endpoint === "roles_pbac") endpoint = "/roles_pbac";
  if (context.endpoint === "anonauth") endpoint = "/anonauth";

  operation.setContext({
    uri: `${baseUrl}${endpoint}`, // full URI
  });

  return forward(operation); // pass operation down the chain
});

// Error handling link
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error("[GraphQL error]:", message); // log GraphQL error
    });
  }

  if (ServerError.is(error)) {
    console.error("[Network error]:", error.statusCode); // statusCode is available here

    if (error.statusCode === 401) {
      localStorage.removeItem("access_token"); // remove expired token

      localStorage.removeItem("user"); // remove cached user
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, dynamicUriLink, httpLink]),
  cache: new InMemoryCache(),
});
