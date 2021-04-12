import { gql } from "@apollo/client/core";

export const MUTATE_UPDATE_MODULES = gql`
  mutation UpdateModules($modules: [String!]!, $descriptions: [String!]!) {
    updateModules(modules: $modules, descriptions: $descriptions) {
      commandGroups
      commandDescriptions
    }
  }
`;
