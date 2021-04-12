import { gql } from "@apollo/client";

export const QUERY_FETCH_MODULES = gql`
  query FetchModules {
    fetchModules {
      commandGroups
      commandDescriptions
    }
  }
`;
