import { gql } from "@apollo/client/core";

export const QUERY_GUILD = gql`
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

export const MUTATE_GUILD = gql`
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

export const TOGGLE_BLOCKED = gql`
  mutation ToggleBlocked($id: String!, $toggleBlocked: String!) {
    toggleBlocked(id: $id, toggleBlocked: $toggleBlocked) {
      guildId
      disabledGroups
    }
  }
`;

export const MUTATE_CREATE_LOG = gql`
  mutation CreateLog(
    $invokingUser: String
    $reason: String
    $message: String
    $affectedUsers: [String!]
    $time: DateTime
    $guild: String!
    $command: String
    $importance: Int
  ) {
    log(
      invokingUser: $invokingUser
      reason: $reason
      message: $message
      affectedUsers: $affectedUsers
      time: $time
      guild: $guild
      command: $command
      importance: $importance
    ) {
      never
    }
  }
`;
