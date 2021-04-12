import { gql } from "@apollo/client/core";

export { QUERY_GUILD, MUTATE_GUILD, MUTATE_TOGGLE_BLOCKED };

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

const MUTATE_TOGGLE_BLOCKED = gql`
  mutation ToggleBlocked($id: String!, $toggleBlocked: String!) {
    toggleBlocked(id: $id, toggleBlocked: $toggleBlocked) {
      guildId
      disabledGroups
    }
  }
`;
