import { gql } from "@apollo/client/core";

export { QUERY_GUILD, MUTATE_GUILD };

const QUERY_GUILD = gql`
  query GetServer($id: String!) {
    getServer(id: $id) {
      guildId
      memberCounter
      prefix
      dateOfEntry
      lastUpdated
      disabledGroups
    }
  }
`;

const MUTATE_GUILD = gql`
  mutation ModifyServer($id: String!, $prefix: String) {
    modifyServer(id: $id, prefix: $prefix) {
      guildId
      memberCounter
      prefix
      dateOfEntry
      lastUpdated
      disabledGroups
    }
  }
`;
